import { NextResponse } from 'next/server'
import { analyzeProvenance } from '@/lib/provenance'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('image')
  if (!(file instanceof File) || !file.type.startsWith('image/')) return NextResponse.json({ error: 'A supported image file is required.' }, { status: 400 })
  if (file.size > 25 * 1024 * 1024) return NextResponse.json({ error: 'Image exceeds the 25 MB limit.' }, { status: 413 })
  const bytes = new Uint8Array(await file.arrayBuffer())
  const provenance = await analyzeProvenance(bytes, file.type)
  return NextResponse.json({ provenance, source: 'embedded PNG metadata parsed server-side; no AI classifier or signature trust-chain validation is claimed' })
}
