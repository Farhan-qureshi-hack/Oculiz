import { PNG } from 'pngjs'
import type { PixelBuffer } from './steganography'

export function decodePng(buffer: Buffer): PixelBuffer {
  const image = PNG.sync.read(buffer)
  return { data: new Uint8ClampedArray(image.data), width: image.width, height: image.height }
}

export function encodePng(image: PixelBuffer): Buffer {
  const png = new PNG({ width: image.width, height: image.height })
  png.data = Buffer.from(image.data)
  return PNG.sync.write(png)
}
