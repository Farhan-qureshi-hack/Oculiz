import { NextResponse } from 'next/server'
import { createAssetId, embedPayload, sha256 } from '@/lib/steganography'
import { decodePng, encodePng } from '@/lib/png'
import { getDb } from '@/lib/db'
import { oculizAssets } from '@/lib/db/schema'
import { analyzeProvenance, provenanceDigest } from '@/lib/provenance'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('image')
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'A PNG image is required.' }, { status: 400 })
    if (file.type !== 'image/png') return NextResponse.json({ error: 'Only PNG images preserve lossless pixel data.' }, { status: 415 })
    const source = Buffer.from(await file.arrayBuffer())
    const image = decodePng(source)
    const provenance = analyzeProvenance(source)
    const assetId = createAssetId()
    const ownerName = String(form.get('ownerName') ?? '').slice(0, 120)
    const ownerEmail = String(form.get('ownerEmail') ?? '').slice(0, 200)
    const ownershipType = String(form.get('ownershipType') ?? 'creator').slice(0, 40)
    const payload = { assetId, signature: provenanceDigest(provenance), metadata: { filename: file.name, ownerName, ownerEmail, ownershipType, provenance: JSON.stringify(provenance) } }
    const protectedImage = embedPayload(image, payload)
    const protectedPng = encodePng(protectedImage)
    const [asset] = await getDb().insert(oculizAssets).values({ originalName: file.name, mimeType: 'image/png', width: image.width, height: image.height, originalSha256: sha256(source), protectedSha256: sha256(protectedPng), payloadVersion: '1', payloadBytes: JSON.stringify(payload).length, status: 'protected', provenanceData: provenance, forensicConfidence: provenance.confidence.toFixed(2), aiModelDetected: provenance.model, aiGenerationDate: provenance.generatedAt ? new Date(provenance.generatedAt) : null, generatorMetadata: { findings: provenance.findings, limitations: provenance.limitations }, registrationSignature: payload.signature }).returning()
    return NextResponse.json({ protected: true, assetId: asset.id, filename: `oculiz-${file.name.replace(/[^a-z0-9._-]/gi, '-')}`, protectedImage: Buffer.from(protectedPng).toString('base64'), provenance })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to protect image.'
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
