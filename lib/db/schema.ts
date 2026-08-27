import { boolean, integer, jsonb, numeric, pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core'

export const oculizApiKeys = pgTable('oculiz_api_keys', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: text('org_id').notNull(),
  keyHash: text('key_hash').notNull().unique(),
  name: text('name').notNull(),
  modelTypes: jsonb('model_types').$type<string[]>().default([]),
  rateLimit: integer('rate_limit').default(100),
  revoked: boolean('revoked').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
})

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
  orgId: text('org_id'),
  apiKeyId: uuid('api_key_id'),
  provenanceData: jsonb('provenance_data').$type<Record<string, unknown>>().default({}),
  forensicConfidence: numeric('forensic_confidence', { precision: 3, scale: 2 }).default('0.5'),
  aiModelDetected: text('ai_model_detected'),
  aiGenerationDate: timestamp('ai_generation_date', { withTimezone: true }),
  generatorMetadata: jsonb('generator_metadata').$type<Record<string, unknown>>().default({}),
  registrationSignature: text('registration_signature'),
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
