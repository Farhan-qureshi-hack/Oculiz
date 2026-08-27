import { createHash, randomBytes } from 'node:crypto'

const MAGIC = new Uint8Array([0x4f, 0x43, 0x55, 0x4c, 0x49, 0x5a])
const VERSION = 1
const HEADER_BYTES = 6 + 1 + 4 + 16

export type StegoPayload = {
  assetId: string
  signature: string
  metadata: Record<string, string>
}

export type PixelBuffer = {
  data: Uint8ClampedArray
  width: number
  height: number
}

export class SteganographyError extends Error {
  constructor(message: string, public code: 'CAPACITY' | 'INVALID_IMAGE' | 'NOT_FOUND' | 'CORRUPTED') {
    super(message)
    this.name = 'SteganographyError'
  }
}

function bytesToHex(bytes: Uint8Array) { return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('') }
function hexToBytes(hex: string) {
  if (!/^[a-f0-9]{32}$/i.test(hex)) throw new SteganographyError('Invalid asset id', 'CORRUPTED')
  return Uint8Array.from(hex.match(/.{2}/g)!, (byte) => Number.parseInt(byte, 16))
}
function encodeText(value: string) { return new TextEncoder().encode(value) }
function decodeText(value: Uint8Array) { return new TextDecoder('utf-8', { fatal: true }).decode(value) }
function writeUint32(value: number) { return new Uint8Array([(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255]) }
function readUint32(value: Uint8Array) { return ((value[0] << 24) | (value[1] << 16) | (value[2] << 8) | value[3]) >>> 0 }
function pack(payload: StegoPayload) {
  const body = encodeText(JSON.stringify(payload))
  const packet = new Uint8Array(HEADER_BYTES + body.length)
  packet.set(MAGIC, 0); packet[6] = VERSION; packet.set(writeUint32(body.length), 7); packet.set(randomBytes(16), 11); packet.set(body, HEADER_BYTES)
  return packet
}
function unpack(packet: Uint8Array): StegoPayload {
  if (packet.length < HEADER_BYTES || !MAGIC.every((byte, index) => packet[index] === byte) || packet[6] !== VERSION) throw new SteganographyError('No valid OCULIZ payload found', 'NOT_FOUND')
  const length = readUint32(packet.slice(7, 11))
  if (length <= 0 || HEADER_BYTES + length > packet.length) throw new SteganographyError('Protected payload is corrupted', 'CORRUPTED')
  try { return JSON.parse(decodeText(packet.slice(HEADER_BYTES, HEADER_BYTES + length))) as StegoPayload } catch { throw new SteganographyError('Protected payload is corrupted', 'CORRUPTED') }
}
function capacity(pixelCount: number) { return Math.floor(pixelCount * 3 / 8) }
function bitAt(packet: Uint8Array, index: number) { return (packet[Math.floor(index / 8)] >> (7 - (index % 8))) & 1 }

export function sha256(data: Uint8Array) { return createHash('sha256').update(data).digest('hex') }
export function createAssetId() { return bytesToHex(randomBytes(16)) }

export function embedPayload(image: PixelBuffer, payload: StegoPayload): PixelBuffer {
  if (!image.width || !image.height || image.data.length !== image.width * image.height * 4) throw new SteganographyError('Invalid RGBA image buffer', 'INVALID_IMAGE')
  const packet = pack(payload)
  if (packet.length > capacity(image.width * image.height)) throw new SteganographyError('Image does not have enough capacity for this payload', 'CAPACITY')
  const data = new Uint8ClampedArray(image.data)
  for (let bit = 0; bit < packet.length * 8; bit++) { const channel = Math.floor(bit / 3) * 4 + (bit % 3); data[channel] = (data[channel] & 254) | bitAt(packet, bit) }
  return { ...image, data }
}

export function extractPayload(image: PixelBuffer): StegoPayload {
  if (!image.width || !image.height || image.data.length !== image.width * image.height * 4) throw new SteganographyError('Invalid RGBA image buffer', 'INVALID_IMAGE')
  const header = new Uint8Array(HEADER_BYTES)
  for (let bit = 0; bit < HEADER_BYTES * 8; bit++) header[Math.floor(bit / 8)] = (header[Math.floor(bit / 8)] << 1) | (image.data[Math.floor(bit / 3) * 4 + (bit % 3)] & 1)
  const length = readUint32(header.slice(7, 11)); const total = HEADER_BYTES + length
  if (total > capacity(image.width * image.height)) throw new SteganographyError('Protected payload is corrupted', 'CORRUPTED')
  const packet = new Uint8Array(total); packet.set(header)
  for (let bit = HEADER_BYTES * 8; bit < total * 8; bit++) packet[Math.floor(bit / 8)] = (packet[Math.floor(bit / 8)] << 1) | (image.data[Math.floor(bit / 3) * 4 + (bit % 3)] & 1)
  return unpack(packet)
}

export function verifyPayload(image: PixelBuffer, expectedAssetId?: string) {
  const payload = extractPayload(image)
  if (expectedAssetId && payload.assetId !== expectedAssetId) throw new SteganographyError('Payload identity does not match the requested asset', 'CORRUPTED')
  return { valid: true as const, payload }
}

export function assetIdBytes(assetId: string) { return hexToBytes(assetId) }
