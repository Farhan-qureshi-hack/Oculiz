import { createHash } from 'node:crypto'
import exifr from 'exifr'

export type ProvenanceFinding = { source: string; value: string; confidence: number; evidence: string }
export type ProvenanceCheck = { name: string; status: 'passed' | 'warning' | 'not-detected'; detail: string }
export type ProvenanceMetadata = { fileSize: number; mimeType: string; width: number | null; height: number | null; bitDepth: number | null; colorType: number | null; modifyDate: string | null; title: string | null; software: string | null; actions: string[]; c2pa: { detected: boolean; generator: string | null; version: string | null; actions: string[]; signaturePresent: boolean } }
export type ProvenanceReport = { aiLikely: boolean; model: string | null; generatedAt: string | null; generator: string | null; findings: ProvenanceFinding[]; checks: ProvenanceCheck[]; confidence: number; limitations: string[]; fingerprint: string; metadata: ProvenanceMetadata }

const text = (bytes: Uint8Array) => new TextDecoder('latin1').decode(bytes)

export async function analyzeProvenance(bytes: Uint8Array, mimeType = 'image/png'): Promise<ProvenanceReport> {
  const rawLower = text(bytes).toLowerCase()
  const exif = await exifr.parse(bytes, { tiff: true, xmp: true, iptc: true, jfif: true, ihdr: true }).catch(() => null) as Record<string, unknown> | null
  const pngText = [...rawLower.matchAll(/(gpt-image|openai media service api|actionssoftwareagentname|c2pa\.created|c2pa\.converted|trainedalgorithmicmedia|claim_generator_info[^\\0]*)/gi)].map((match) => match[1])
  const c2paActions = pngText.filter((value) => value.includes('c2pa.'))
  const generator = typeof exif?.ActionsSoftwareAgentName === 'string' ? exif.ActionsSoftwareAgentName : rawLower.includes('openai media service api') ? 'OpenAI Media Service API' : null
  const model = typeof exif?.ActionsSoftwareAgentName === 'string' ? exif.ActionsSoftwareAgentName : rawLower.includes('gpt-image') ? 'gpt-image' : null
  const metadata: ProvenanceMetadata = { fileSize: bytes.byteLength, mimeType, width: typeof exif?.ImageWidth === 'number' ? exif.ImageWidth : null, height: typeof exif?.ImageHeight === 'number' ? exif.ImageHeight : null, bitDepth: typeof exif?.BitDepth === 'number' ? exif.BitDepth : null, colorType: typeof exif?.ColorType === 'number' ? exif.ColorType : null, modifyDate: typeof exif?.ModifyDate === 'string' ? exif.ModifyDate : null, title: typeof exif?.Title === 'string' ? exif.Title : null, software: typeof exif?.Software === 'string' ? exif.Software : null, actions: c2paActions, c2pa: { detected: rawLower.includes('c2pa') || Boolean(exif?.JUMBF), generator, version: typeof exif?.ActionsSoftwareAgentVersion === 'string' ? exif.ActionsSoftwareAgentVersion : null, actions: c2paActions, signaturePresent: rawLower.includes('signature') || rawLower.includes('sigts') } }

  const raw = text(bytes)
  const findings: ProvenanceFinding[] = []
  const add = (source: string, value: string, confidence: number, evidence: string) => findings.push({ source, value, confidence, evidence })
  const models = [/dall[- ]?e\s*3?/i, /midjourney/i, /stable diffusion/i, /comfyui/i, /automatic1111/i, /flux(?:\s+pro)?/i, /firefly/i, /generative fill/i]
  for (const pattern of models) { const match = raw.match(pattern); if (match) { add('embedded metadata', match[0], 0.92, `Detected provider marker: ${match[0]}`); break } }
  for (const marker of ['c2pa', 'c2pa.actions', 'xmp', 'photoshop', 'software']) { if (raw.toLowerCase().includes(marker)) add('metadata marker', marker, marker.startsWith('c2pa') ? 0.95 : 0.7, `Found ${marker} metadata marker`) }
  const dateMatch = raw.match(/20\d{2}[-/:]\d{2}[-/:]\d{2}(?:[T ]\d{2}:\d{2}:\d{2})?/)
  if (dateMatch) add('embedded metadata', dateMatch[0], 0.78, 'Found an embedded date-like value')
  const ai = findings.some((finding) => finding.source === 'embedded metadata' && /dall|midjourney|diffusion|comfy|flux|firefly/i.test(finding.value))
  const fingerprint = createHash('sha256').update(bytes).digest('hex')
  const checks: ProvenanceCheck[] = [
    { name: 'File fingerprint', status: 'passed', detail: `SHA-256 ${fingerprint.slice(0, 16)}…` },
    { name: 'C2PA / signed provenance', status: findings.some((f) => f.value.toLowerCase().includes('c2pa')) ? 'passed' : 'not-detected', detail: findings.some((f) => f.value.toLowerCase().includes('c2pa')) ? 'A C2PA marker was found; signature validity requires a trust-chain verifier.' : 'No C2PA marker was found in the uploaded bytes.' },
    { name: 'AI provider marker', status: ai ? 'passed' : 'not-detected', detail: ai ? `Provider marker detected: ${findings.find((f) => /dall|midjourney|diffusion|comfy|flux|firefly/i.test(f.value))?.value}` : 'No known provider marker was found; this does not prove the image is human-made.' },
    { name: 'Generation timestamp', status: dateMatch ? 'passed' : 'not-detected', detail: dateMatch ? `Embedded date candidate: ${dateMatch[0]}` : 'No reliable generation date was embedded.' },
    { name: 'Creator identity', status: 'warning', detail: 'Not inferred. IP, email, or person identity requires signed metadata or an authorized provider record.' },
  ]
  return { aiLikely: ai, model: findings.find((finding) => /dall|midjourney|diffusion|comfy|flux|firefly/i.test(finding.value))?.value ?? null, generatedAt: dateMatch?.[0] ?? null, generator: null, findings, checks, confidence: findings.length ? Math.max(...findings.map((finding) => finding.confidence)) : 0.18, fingerprint, limitations: ['Metadata can be stripped or forged.', 'Pixels alone cannot reliably identify a model, date, IP address, email, or human author.', 'No personal identity is inferred without explicit signed metadata or an authorized provider record.', 'A high confidence score reflects detected evidence, not proof of authorship.'], metadata }
}

export function provenanceDigest(report: ProvenanceReport) { return createHash('sha256').update(JSON.stringify(report)).digest('hex') }
