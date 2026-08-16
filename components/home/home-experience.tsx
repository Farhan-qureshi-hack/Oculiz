'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import { SteganographyField } from '@/components/motion/steganography-field'

const logoUrl = '/brand/oculiz-logo.png'
const questions = [
  ['What does OCULIZ verify?', 'Provenance, ownership records, metadata, watermarks, signatures, and forensic integrity signals.'],
  ['Can the signal survive image distribution?', 'The ownership layer is designed to remain recoverable across common export and distribution workflows.'],
  ['Does protection alter the original image?', 'No. The original stays preserved while protected derivatives and ownership records remain linked.'],
]

function MeteorField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [burst, setBurst] = useState(0)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points = Array.from({ length: 360 }, (_, i) => ({
      x: Math.sin(i * 78.3) * 0.5 + 0.5, y: Math.sin(i * 39.7) * 0.5 + 0.5,
      phase: Math.sin(i * 12.4) * Math.PI, size: 0.4 + (i % 5) * 0.22,
    }))
    let w = 0, h = 0, raf = 0, time = 0, pulse = 0, target = burst ? 1 : 0, px = .5, py = .5
    const burstStarted = burst ? performance.now() : 0
    const resize = () => { const r = canvas.getBoundingClientRect(); const d = Math.min(devicePixelRatio || 1, 2); w = r.width; h = r.height; canvas.width = w * d; canvas.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0) }
    const pointer = (e: PointerEvent) => { px = e.clientX / innerWidth; py = e.clientY / innerHeight }
    const run = () => {
      time += .012; pulse += (target - pulse) * .08; ctx.clearRect(0, 0, w, h)
      points.forEach((p, i) => {
        const drift = reduced ? 0 : Math.sin(time + p.phase) * 7
        const react = burst ? Math.max(0, 1 - Math.abs((p.x * w - w * (.2 + pulse * .65)) / 240)) : 0
        const x = p.x * w + drift + (px - .5) * 14 + react * (p.x < .5 ? -18 : 18)
        const y = p.y * h + drift + (py - .5) * 10
        const alpha = .08 + (i % 7) * .018 + pulse * .15 + react * .22
        ctx.beginPath(); ctx.fillStyle = `rgba(111,174,255,${alpha})`; ctx.arc(x, y, p.size + pulse * .5, 0, Math.PI * 2); ctx.fill()
      })
      if (burst) {
        const t = Math.min(1, (performance.now() - burstStarted) / 2400), x = w * (.12 + t * .74), y = h * (.05 + t * .82)
        const gradient = ctx.createLinearGradient(x - 180, y - 180, x, y); gradient.addColorStop(0, 'rgba(150,210,255,0)'); gradient.addColorStop(.72, 'rgba(91,165,255,.25)'); gradient.addColorStop(1, 'rgba(255,255,255,.95)')
        ctx.strokeStyle = gradient; ctx.lineWidth = 2.5 + (1 - t) * 5; ctx.shadowBlur = 24; ctx.shadowColor = '#6eaeff'; ctx.beginPath(); ctx.moveTo(x - 170, y - 170); ctx.lineTo(x, y); ctx.stroke(); ctx.shadowBlur = 0
        for (let i = 0; i < 18; i++) { const a = i * .9, r = (1 - t) * 80 + 12; ctx.fillStyle = `rgba(157,213,255,${(1 - t) * .6})`; ctx.fillRect(x + Math.cos(a) * r, y + Math.sin(a) * r, 2, 2) }
        if (t >= 1) setBurst(0)
      }
      raf = requestAnimationFrame(run)
    }
    resize(); addEventListener('resize', resize); addEventListener('pointermove', pointer, { passive: true }); raf = requestAnimationFrame(run)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', pointer) }
  }, [burst])
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}

function Logo({ onClick }: { onClick?: () => void }) {
  return <button type="button" onClick={onClick} aria-label="Trigger OCULIZ meteor" className="rounded-md bg-white px-2 py-1 shadow-sm transition duration-500 hover:scale-[1.03] dark:bg-slate-100"><img src={logoUrl} alt="OCULIZ" className="h-11 w-auto" /></button>
}

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])
  const toggle = () => { const next = !dark; document.documentElement.classList.toggle('dark', next); document.documentElement.style.colorScheme = next ? 'dark' : 'light'; localStorage.setItem('oculiz-theme', next ? 'dark' : 'light'); setDark(next) }
  return <button type="button" aria-label="Toggle color theme" onClick={toggle} className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-300 text-slate-600 transition duration-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
}

function MorphingScene({ id, eyebrow, title, body, formation, children }: { id: string; eyebrow: string; title: string; body: string; formation: 'bits' | 'orbit' | 'matrix'; children: ReactNode }) {
  return <section id={id} className="relative min-h-[190vh] border-b border-slate-200/80 dark:border-slate-800/80"><div className="sticky top-20 flex min-h-[calc(100vh-80px)] items-center"><div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.82fr_1.18fr] lg:gap-24 lg:px-10"><div className="self-center"><div className="font-mono text-[10px] uppercase tracking-[.24em] text-blue-600 dark:text-blue-400">{eyebrow}</div><h2 className="mt-6 max-w-xl text-5xl font-semibold tracking-[-.07em] text-slate-950 dark:text-white sm:text-7xl">{title}</h2><p className="mt-6 max-w-md text-base leading-8 text-slate-600 dark:text-slate-300">{body}</p></div><div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#07111f] shadow-[0_40px_120px_rgba(24,78,160,.16)]"><SteganographyField formation={formation} density={290} className="opacity-90" />{children}</div></div></div></section>
}

export default function HomeExperience() {
  const [menu, setMenu] = useState(false); const [meteor, setMeteor] = useState(0); const [faq, setFaq] = useState(0)
  return <main className="min-h-screen overflow-hidden bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f7f9fc]/85 backdrop-blur-xl transition-colors duration-700 dark:border-slate-800 dark:bg-[#0e1726]/85"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"><Logo onClick={() => setMeteor(Date.now())} /><nav className="hidden items-center gap-9 text-sm text-slate-600 md:flex dark:text-slate-300"><a href="#identity" className="transition hover:text-blue-600">Identity</a><a href="#proof" className="transition hover:text-blue-600">Proof</a><a href="#watermark" className="transition hover:text-blue-600">Watermark</a><a href="#faq" className="transition hover:text-blue-600">FAQ</a></nav><div className="hidden items-center gap-3 md:flex"><ThemeToggle /><Link href="/login" className="btn-base btn-outline">Sign in</Link><Link href="/register" className="btn-base btn-primary">Get started <ArrowRight size={15} /></Link></div><button type="button" aria-label="Open navigation" onClick={() => setMenu(!menu)} className="rounded-full p-2 md:hidden">{menu ? <X /> : <Menu />}</button></div>{menu && <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-800 md:hidden"><div className="flex flex-col gap-5 text-sm"><a href="#identity" onClick={() => setMenu(false)}>Identity</a><a href="#proof" onClick={() => setMenu(false)}>Proof</a><a href="#watermark" onClick={() => setMenu(false)}>Watermark</a><Link href="/register" className="btn-base btn-primary w-fit">Get started <ArrowRight size={15} /></Link></div></div>}</header>
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden"><MeteorField key={meteor} /><div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-24 lg:px-10"><div className="max-w-5xl"><div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.24em] text-blue-600 dark:text-blue-400"><span className="h-px w-10 bg-blue-500" />Ownership infrastructure / 01</div><h1 className="max-w-5xl text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.88] tracking-[-.09em] text-slate-950 dark:text-white">Trust,<br /><span className="text-blue-600 dark:text-blue-400">built into</span><br />every pixel.</h1><p className="mt-10 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">AI can create. OCULIZ gives creation an identity, a provenance trail, and proof that travels with the image.</p><div className="mt-10 flex flex-wrap gap-3"><Link href="/generate" className="btn-base btn-primary">Start with an image <ArrowRight size={15} /></Link><Link href="/verify" className="btn-base btn-outline">Open verifier</Link></div></div></div><div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[.24em] text-slate-400">Scroll to reveal the signal</div></section>
    <MorphingScene id="identity" eyebrow="Creation / identity / 02" title="AI can create." body="Creation is only the first state. Watch a dispersed image field begin to converge around a single, recoverable identity." formation="bits"><div className="absolute inset-0 grid place-items-center"><div className="h-52 w-52 rounded-full border border-blue-300/30 shadow-[0_0_100px_rgba(61,137,255,.28)]" /><div className="absolute font-mono text-[10px] tracking-[.2em] text-blue-100">IMAGE ID / OC-24A91F</div></div></MorphingScene>
    <MorphingScene id="proof" eyebrow="Forensics / proof / 03" title="Creation needs proof." body="The particles stop behaving like noise. They organize into a forensic record: hash, timestamp, signature, and a visible chain of custody." formation="orbit"><div className="absolute inset-8 border border-blue-300/20"><div className="absolute left-5 top-5 space-y-3 font-mono text-[10px] text-blue-200"><div>HASH / A91F-22C0-88</div><div>SIGNATURE / MATCHED</div><div>INTEGRITY / 99.8%</div></div><div className="absolute inset-1/2 h-px w-[72%] -translate-x-1/2 bg-blue-300/70 shadow-[0_0_28px_4px_rgba(96,165,250,.45)]" /></div></MorphingScene>
    <MorphingScene id="watermark" eyebrow="Steganography / provenance / 04" title="Proof needs provenance." body="An invisible watermark emerges from the formation. It is not decoration; it is the ownership signal embedded below the visible surface." formation="matrix"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0_18%,rgba(4,12,27,.2)_45%,rgba(4,12,27,.9)_100%)]" /><div className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[10px] text-blue-200"><span>WATERMARK / ACTIVE</span><span>PIXEL DELTA / 0.00%</span></div></MorphingScene>
    <section className="relative min-h-[160vh] border-b border-slate-200 dark:border-slate-800"><div className="sticky top-20 flex min-h-[calc(100vh-80px)] items-center"><div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10"><div className="font-mono text-[10px] uppercase tracking-[.24em] text-blue-600 dark:text-blue-400">Signal / trust / 05</div><h2 className="mx-auto mt-6 max-w-5xl text-6xl font-semibold tracking-[-.08em] text-slate-950 dark:text-white sm:text-9xl">OCULIZ.</h2><p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">One signal. Every surface. The identity settles into a verification-ready record.</p><div className="mx-auto mt-12 h-1 max-w-md overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950"><div className="h-full w-3/4 bg-blue-600" /></div></div></div></section>
    <section id="faq" className="mx-auto max-w-4xl px-6 py-32"><div className="text-center"><div className="font-mono text-[10px] uppercase tracking-[.24em] text-blue-600 dark:text-blue-400">Clear answers / 06</div><h2 className="mt-5 text-5xl font-semibold tracking-[-.07em] text-slate-950 dark:text-white">Built for scrutiny.</h2></div><div className="mt-12 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">{questions.map(([q, a], i) => <div key={q} className="py-6"><button type="button" onClick={() => setFaq(faq === i ? -1 : i)} className="flex w-full items-center justify-between text-left font-medium text-slate-900 dark:text-white">{q}<ChevronDown size={18} className={`transition ${faq === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} /></button>{faq === i && <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{a}</p>}</div>)}</div></section>
    <footer className="border-t border-slate-200 dark:border-slate-800"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between lg:px-10"><div><Logo /><p className="mt-4 max-w-xs text-sm text-slate-500">Protect. Verify. Own. The provenance layer for AI-generated imagery.</p></div><Link href="/verify" className="btn-base btn-primary">Verify an image <ArrowRight size={15} /></Link></div></footer>
  </main>
}
