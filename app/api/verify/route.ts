import { NextResponse } from 'next/server'
import { extractPayload, sha256, SteganographyError } from '@/lib/steganography'
import { decodePng } from '@/lib/png'
import { getDb } from '@/lib/db'
import { oculizVerificationEvents } from '@/lib/db/schema'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('image')
    if (!(file instanceof File) || file.type !== 'image/png') return NextResponse.json({ error: 'A PNG image is required.' }, { status: 400 })
    const image = decodePng(Buffer.from(await file.arrayBuffer()))
    const payload = extractPayload(image)
    await getDb().insert(oculizVerificationEvents).values({ assetId: payload.assetId, result: 'valid', confidence: '100.00', extractedSha256: sha256(new Uint8Array(image.data)), details: payload })
    return NextResponse.json({ valid: true, confidence: 100, payload })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to verify image.'
    const status = error instanceof SteganographyError && error.code === 'NOT_FOUND' ? 200 : 422
    return NextResponse.json({ valid: false, confidence: 0, error: message }, { status })
  }
}
