import { NextResponse } from 'next/server'
import { extractPayload, sha256, SteganographyError } from '@/lib/steganography'
import { decodePng } from '@/lib/png'
import { getDb } from '@/lib/db'
import { oculizAssets, oculizVerificationEvents } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { analyzeProvenance } from '@/lib/provenance'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('image')
    if (!(file instanceof File) || file.type !== 'image/png') return NextResponse.json({ error: 'A PNG image is required.' }, { status: 400 })
    const bytes = Buffer.from(await file.arrayBuffer())
    const image = decodePng(bytes)
    const payload = extractPayload(image)
    const provenance = analyzeProvenance(bytes)
    const [asset] = await getDb().select().from(oculizAssets).where(eq(oculizAssets.id, payload.assetId)).limit(1)
    const details = { payload, provenance, registered: Boolean(asset), storedProvenance: asset?.provenanceData ?? null, registeredSignature: asset?.registrationSignature ?? null }
    await getDb().insert(oculizVerificationEvents).values({ assetId: payload.assetId, result: asset ? 'valid' : 'unregistered', confidence: asset ? '100.00' : (provenance.confidence * 100).toFixed(2), extractedSha256: sha256(new Uint8Array(image.data)), details })
    return NextResponse.json({ valid: Boolean(asset), confidence: asset ? 100 : provenance.confidence * 100, payload, provenance, registered: Boolean(asset), storedProvenance: asset?.provenanceData ?? null })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to verify image.'
    const status = error instanceof SteganographyError && error.code === 'NOT_FOUND' ? 200 : 422
    return NextResponse.json({ valid: false, confidence: 0, error: message }, { status })
  }
}
