import { NextResponse } from 'next/server'
import { extractPayload, sha256 } from '@/lib/steganography'
import { decodePng } from '@/lib/png'
import { getDb } from '@/lib/db'
import { oculizAssets } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { analyzeProvenance, provenanceDigest } from '@/lib/provenance'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('image')
    if (!(file instanceof File) || file.type !== 'image/png') return NextResponse.json({ error: 'A protected PNG image is required.' }, { status: 400 })
    const bytes = Buffer.from(await file.arrayBuffer())
    const image = decodePng(bytes)
    const payload = extractPayload(image)
    const provenance = analyzeProvenance(bytes)
    const [asset] = await getDb().update(oculizAssets).set({ originalName: file.name, protectedSha256: sha256(bytes), status: 'registered', provenanceData: provenance, forensicConfidence: provenance.confidence.toFixed(2), aiModelDetected: provenance.model, aiGenerationDate: provenance.generatedAt ? new Date(provenance.generatedAt) : null, generatorMetadata: { findings: provenance.findings, limitations: provenance.limitations }, registrationSignature: provenanceDigest(provenance), updatedAt: new Date() }).where(eq(oculizAssets.id, payload.assetId)).returning()
    if (!asset) return NextResponse.json({ error: 'No matching OCULIZ asset was found.' }, { status: 404 })
    return NextResponse.json({ registered: true, assetId: asset.id, payload, provenance })
  } catch (error) {
    return NextResponse.json({ registered: false, error: error instanceof Error ? error.message : 'Unable to register image.' }, { status: 422 })
  }
}
