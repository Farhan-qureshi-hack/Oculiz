import { integer, jsonb, numeric, pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core'

export const oculizAssets = pgTable('oculiz_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id'),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  originalSha256: text('original_sha256').notNull(),
  protectedSha256: text('protected_sha256').notNull(),
  payloadVersion: text('payload_version').notNull(),
  payloadBytes: integer('payload_bytes').notNull(),
  status: text('status').notNull().default('protected'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({ userCreated: index('oculiz_assets_user_created_idx').on(table.userId, table.createdAt) }))

export const oculizVerificationEvents = pgTable('oculiz_verification_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id').notNull(),
  userId: uuid('user_id'),
  result: text('result').notNull(),
  confidence: numeric('confidence', { precision: 5, scale: 2 }).notNull(),
  extractedSha256: text('extracted_sha256'),
  details: jsonb('details').$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({ assetCreated: index('oculiz_verification_asset_created_idx').on(table.assetId, table.createdAt) }))
