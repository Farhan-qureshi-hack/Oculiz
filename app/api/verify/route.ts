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
    const currentSha256 = sha256(bytes)
    const fingerprintMatches = Boolean(asset && asset.protectedSha256 === currentSha256)
    const payloadAuthenticated = payload.security === 'AES-256-GCM'
    const valid = Boolean(asset && fingerprintMatches && payloadAuthenticated)
    const details = { payload, payloadAuthenticated, provenance, registered: Boolean(asset), fingerprintMatches, currentSha256, storedFingerprint: asset?.protectedSha256 ?? null, storedProvenance: asset?.provenanceData ?? null, registeredSignature: asset?.registrationSignature ?? null }
    await getDb().insert(oculizVerificationEvents).values({ assetId: payload.assetId, result: valid ? 'valid' : 'tampered', confidence: valid ? '100.00' : '0.00', extractedSha256: currentSha256, details })
    return NextResponse.json({ valid, status: valid ? 'verified' : asset ? 'tampered' : 'unregistered', confidence: valid ? 100 : 0, payload, payloadAuthenticated, provenance, registered: Boolean(asset), fingerprintMatches, currentSha256, storedProvenance: asset?.provenanceData ?? null })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to verify image.'
    const status = error instanceof SteganographyError && error.code === 'NOT_FOUND' ? 200 : 422
    return NextResponse.json({ valid: false, confidence: 0, error: message }, { status })
  }
}
