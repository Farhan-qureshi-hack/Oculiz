import { NextResponse } from 'next/server'
import { createAssetId, embedPayload, sha256 } from '@/lib/steganography'
import { decodePng, encodePng } from '@/lib/png'
import { getDb } from '@/lib/db'
import { oculizAssets } from '@/lib/db/schema'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('image')
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'A PNG image is required.' }, { status: 400 })
    if (file.type !== 'image/png') return NextResponse.json({ error: 'Only PNG images preserve lossless pixel data.' }, { status: 415 })
    const source = Buffer.from(await file.arrayBuffer())
    const image = decodePng(source)
    const assetId = createAssetId()
    const payload = { assetId, signature: sha256(new TextEncoder().encode(`${assetId}:${file.name}`)), metadata: { filename: file.name } }
    const protectedImage = embedPayload(image, payload)
    const protectedPng = encodePng(protectedImage)
    const [asset] = await getDb().insert(oculizAssets).values({ originalName: file.name, mimeType: 'image/png', width: image.width, height: image.height, originalSha256: sha256(source), protectedSha256: sha256(protectedPng), payloadVersion: '1', payloadBytes: JSON.stringify(payload).length, status: 'protected' }).returning()
    return new NextResponse(protectedPng as unknown as BodyInit, { headers: { 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="oculiz-${file.name.replace(/[^a-z0-9._-]/gi, '-') }"`, 'X-OCULIZ-Asset-ID': asset.id } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to protect image.'
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
