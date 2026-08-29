import assert from 'node:assert/strict'
import { embedPayload, extractPayload, type PixelBuffer } from '../lib/steganography'

const image: PixelBuffer = { width: 64, height: 64, data: new Uint8ClampedArray(64 * 64 * 4).fill(127) }
const payload = { assetId: '0123456789abcdef0123456789abcdef', signature: 'test-signature', metadata: { ownerName: 'Test Owner', ownershipType: 'creator' } }

const protectedImage = embedPayload(image, payload)
const extracted = extractPayload(protectedImage)
assert.equal(extracted.assetId, payload.assetId)
assert.equal(extracted.metadata.ownerName, payload.metadata.ownerName)
assert.ok(extracted.security === 'AES-256-GCM' || extracted.security === 'integrity-only')

const tampered = { ...protectedImage, data: new Uint8ClampedArray(protectedImage.data) }
tampered.data[0] ^= 1
assert.throws(() => extractPayload(tampered))

const blank: PixelBuffer = { width: 64, height: 64, data: new Uint8ClampedArray(64 * 64 * 4).fill(255) }
assert.throws(() => extractPayload(blank))
console.log('[v0] steganography round-trip, tamper, and missing-payload tests passed')
