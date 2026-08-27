import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { getDb } from '@/lib/db'
import { oculizAssets } from '@/lib/db/schema'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const assets = await getDb().select({ id: oculizAssets.id, originalName: oculizAssets.originalName, mimeType: oculizAssets.mimeType, width: oculizAssets.width, height: oculizAssets.height, status: oculizAssets.status, originalSha256: oculizAssets.originalSha256, protectedSha256: oculizAssets.protectedSha256, createdAt: oculizAssets.createdAt, updatedAt: oculizAssets.updatedAt }).from(oculizAssets).orderBy(desc(oculizAssets.createdAt)).limit(100)
    return NextResponse.json({ assets })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load asset history.' }, { status: 503 })
  }
}
