import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  if (!db) return NextResponse.json({ ok: false, database: 'missing', encryption: 'missing' }, { status: 503 })
  try {
    await db.execute(sql`select 1`)
    return NextResponse.json({ ok: true, database: 'connected', encryption: process.env.OCULIZ_ENCRYPTION_KEY ? 'configured' : 'missing' })
  } catch (error) {
    console.error('[v0] health database check failed', error)
    return NextResponse.json({ ok: false, database: 'unreachable', encryption: process.env.OCULIZ_ENCRYPTION_KEY ? 'configured' : 'missing' }, { status: 503 })
  }
}
