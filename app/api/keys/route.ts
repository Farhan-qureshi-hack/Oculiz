import { NextResponse } from 'next/server'
import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { getDb } from '@/lib/db'
import { oculizApiKeys } from '@/lib/db/schema'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : ''
    if (!name) return NextResponse.json({ error: 'A key name is required' }, { status: 400 })
    const secret = `oculiz_live_${randomBytes(32).toString('base64url')}`
    const hash = createHash('sha256').update(secret).digest('hex')
    const [record] = await getDb().insert(oculizApiKeys).values({ id: randomUUID(), orgId: 'default', keyHash: hash, name, modelTypes: ['image'], rateLimit: 100, revoked: false }).returning({ id: oculizApiKeys.id, name: oculizApiKeys.name, createdAt: oculizApiKeys.createdAt })
    return NextResponse.json({ key: secret, integration: record }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create API key' }, { status: 500 })
  }
}
