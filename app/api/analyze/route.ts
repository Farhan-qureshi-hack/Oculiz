import { NextResponse } from 'next/server'
import { analyzeProvenance } from '@/lib/provenance'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('image')
  if (!(file instanceof File) || file.type !== 'image/png') return NextResponse.json({ error: 'A PNG image is required.' }, { status: 400 })
  const provenance = analyzeProvenance(new Uint8Array(await file.arrayBuffer()))
  return NextResponse.json({ provenance })
}
