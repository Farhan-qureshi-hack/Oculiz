import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

export const pool = connectionString ? new Pool({ connectionString, max: 5 }) : null
export const db = pool ? drizzle(pool, { schema }) : null

export function getDb() {
  if (!db) throw new Error('DATABASE_URL is not configured')
  return db
}
