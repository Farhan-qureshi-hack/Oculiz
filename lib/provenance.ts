import { createHash } from 'node:crypto'

export type ProvenanceFinding = { source: string; value: string; confidence: number; evidence: string }
export type ProvenanceReport = { aiLikely: boolean; model: string | null; generatedAt: string | null; generator: string | null; findings: ProvenanceFinding[]; confidence: number; limitations: string[] }

const text = (bytes: Uint8Array) => new TextDecoder('latin1').decode(bytes)

export function analyzeProvenance(bytes: Uint8Array): ProvenanceReport {
  const raw = text(bytes)
  const findings: ProvenanceFinding[] = []
  const add = (source: string, value: string, confidence: number, evidence: string) => findings.push({ source, value, confidence, evidence })
  const models = [/dall[- ]?e\s*3?/i, /midjourney/i, /stable diffusion/i, /comfyui/i, /automatic1111/i, /flux(?:\s+pro)?/i, /firefly/i, /generative fill/i]
  for (const pattern of models) { const match = raw.match(pattern); if (match) { add('embedded metadata', match[0], 0.92, `Detected provider marker: ${match[0]}`); break } }
  for (const marker of ['c2pa', 'c2pa.actions', 'xmp', 'photoshop', 'software']) { if (raw.toLowerCase().includes(marker)) add('metadata marker', marker, marker.startsWith('c2pa') ? 0.95 : 0.7, `Found ${marker} metadata marker`) }
  const dateMatch = raw.match(/20\d{2}[-/:]\d{2}[-/:]\d{2}(?:[T ]\d{2}:\d{2}:\d{2})?/)
  if (dateMatch) add('embedded metadata', dateMatch[0], 0.78, 'Found an embedded date-like value')
  const ai = findings.some((finding) => finding.source === 'embedded metadata' && /dall|midjourney|diffusion|comfy|flux|firefly/i.test(finding.value))
  return { aiLikely: ai, model: findings.find((finding) => /dall|midjourney|diffusion|comfy|flux|firefly/i.test(finding.value))?.value ?? null, generatedAt: dateMatch?.[0] ?? null, generator: null, findings, confidence: findings.length ? Math.max(...findings.map((finding) => finding.confidence)) : 0.18, limitations: ['Metadata can be stripped or forged.', 'Pixels alone cannot reliably identify a model, date, IP address, email, or human author.', 'No personal identity is inferred without explicit signed metadata or an authorized provider record.'] }
}

export function provenanceDigest(report: ProvenanceReport) { return createHash('sha256').update(JSON.stringify(report)).digest('hex') }
