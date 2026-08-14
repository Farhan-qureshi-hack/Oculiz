'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Fingerprint, LockKeyhole, Menu, ScanSearch, ShieldCheck, X } from 'lucide-react';

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_Aug_3__2026__07_28_34_PM-removebg-preview-VS5SxVWz50yZaR3h0oljYvoouFegqa.png';

const capabilities = [
  { icon: Fingerprint, label: 'Ownership', title: 'Make authorship legible.', text: 'Register an image with a durable provenance record and a verifiable chain of custody.' },
  { icon: ScanSearch, label: 'Verification', title: 'Know what is real.', text: 'Run forensic checks for tampering, re-encoding, and conflicting metadata in seconds.' },
  { icon: LockKeyhole, label: 'Protection', title: 'Defend the original.', text: 'Invisible signals and signed reports give your work a clear, defensible identity.' },
];

const faqs = [
  ['What does OCULIZ verify?', 'OCULIZ checks image provenance signals, ownership records, metadata, and forensic indicators to produce a confidence-led verification report.'],
  ['Can I verify an image without an account?', 'Yes. Public verification links can be reviewed by anyone, while private workspaces keep sensitive records behind your account.'],
  ['Does OCULIZ alter my original image?', 'The original file remains preserved. Protection workflows create a tracked derivative and keep the source record available for audit.'],
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const toggle = () => {
    document.documentElement.classList.toggle('dark', !dark);
    setDark(!dark);
  };
  return <button aria-label="Toggle color theme" onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-600 dark:text-slate-300"><span className="text-sm">{dark ? '☼' : '◐'}</span></button>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] dark:bg-[#0e1726]">
      <header className="relative z-20 border-b border-slate-200/80 bg-[#f7f9fc]/90 backdrop-blur dark:border-slate-800 dark:bg-[#0e1726]/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" aria-label="OCULIZ home" className="rounded-md bg-white px-2 py-1 shadow-sm"><img src={logoUrl} alt="OCULIZ — Protect. Verify. Own." className="h-12 w-auto object-contain" /></Link>
          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex dark:text-slate-300">
            <a href="#platform" className="transition hover:text-blue-600">Platform</a>
            <a href="#workflow" className="transition hover:text-blue-600">How it works</a>
            <a href="#security" className="transition hover:text-blue-600">Security</a>
            <a href="#faq" className="transition hover:text-blue-600">FAQ</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex"><ThemeToggle /><Link href="/login" className="btn-base btn-outline">Sign in</Link><Link href="/register" className="btn-base btn-primary">Get started <ArrowRight size={15} /></Link></div>
          <button aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)} className="rounded-md p-2 md:hidden">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-800 md:hidden"><div className="flex flex-col gap-4 text-sm"><a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a><a href="#workflow" onClick={() => setMenuOpen(false)}>How it works</a><a href="#security" onClick={() => setMenuOpen(false)}>Security</a><Link href="/register" className="btn-base btn-primary w-fit">Get started <ArrowRight size={15} /></Link></div></div>}
      </header>

      <section className="shell-grid relative border-b border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-28">
          <div>
            <div className="mono-label mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400"><span className="h-px w-8 bg-blue-600" />The trust layer for AI imagery</div>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">Protect the image.<br /><span className="text-blue-600 dark:text-blue-400">Prove the origin.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">OCULIZ gives creators, studios, and organizations a clear record of who made an image, what happened to it, and whether it can be trusted.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/register" className="btn-base btn-primary px-5 py-3">Protect your first image <ArrowRight size={16} /></Link><a href="#workflow" className="btn-base btn-outline px-5 py-3">See how it works</a></div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><Check size={15} className="text-emerald-500" />Audit-ready reports</span><span className="flex items-center gap-2"><Check size={15} className="text-emerald-500" />Built for sensitive work</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="panel relative overflow-hidden p-5 sm:p-7">
              <div className="mb-8 flex items-center justify-between"><div><div className="mono-label text-slate-400">Live verification</div><div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Untitled portrait / 04</div></div><span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Verified</span></div>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"><div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 42% 38%, #d7e7ff 0, transparent 28%), radial-gradient(circle at 70% 65%, #b7cced 0, transparent 30%), linear-gradient(135deg, #b9c9dc, #eff4fa)' }} /><div className="relative h-44 w-36 rounded-[48%] bg-slate-700/70 shadow-2xl shadow-slate-900/20"><div className="absolute left-1/2 top-7 h-20 w-20 -translate-x-1/2 rounded-full bg-slate-300/70" /><div className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-t-[48%] bg-slate-800/80" /></div><div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-md border border-white/70 bg-white/70 px-3 py-2 text-xs text-slate-700 backdrop-blur dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-200"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-blue-600" />Signature intact</span><span className="font-mono text-[10px]">OCZ-84F2</span></div></div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 text-xs dark:border-slate-700"><div><div className="text-slate-400">Ownership</div><div className="mt-1 font-medium text-slate-800 dark:text-slate-200">Confirmed</div></div><div><div className="text-slate-400">Alteration</div><div className="mt-1 font-medium text-slate-800 dark:text-slate-200">None found</div></div><div><div className="text-slate-400">Confidence</div><div className="mt-1 font-medium text-blue-600">99.8%</div></div></div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs shadow-xl sm:block dark:border-slate-700 dark:bg-slate-900"><div className="mono-label text-[9px] text-slate-400">Fingerprint</div><div className="mt-1 font-mono text-slate-700 dark:text-slate-200">7d2c...a91f</div></div>
          </div>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-24 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><div className="mono-label text-blue-600 dark:text-blue-400">One clear record</div><h2 className="mt-5 max-w-md text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">Trust should be inspectable.</h2><p className="mt-5 max-w-md leading-7 text-slate-600 dark:text-slate-300">A simple, defensible workflow for work that cannot afford ambiguity.</p></div><div className="grid gap-4 md:grid-cols-3">{capabilities.map(({ icon: Icon, label, title, text }) => <article key={label} className="panel p-6 transition hover:-translate-y-1"><div className="flex items-center justify-between"><Icon size={20} className="text-blue-600" /><span className="mono-label text-slate-400">{label}</span></div><h3 className="mt-12 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></article>)}</div></div></section>

      <section id="workflow" className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-[#101c2d]"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="mono-label text-blue-600 dark:text-blue-400">A calm workflow</div><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">From file to proof.</h2></div><p className="max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">Every action leaves a useful signal. Nothing is hidden behind a black box.</p></div><div className="mt-16 grid gap-0 md:grid-cols-4">{['Create or upload', 'Register ownership', 'Monitor the record', 'Verify anywhere'].map((step, index) => <div key={step} className="relative border-l border-slate-200 px-6 py-2 first:border-l-0 dark:border-slate-700"><div className="mono-label text-blue-600">0{index + 1}</div><h3 className="mt-6 text-lg font-semibold text-slate-950 dark:text-white">{step}</h3><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{['Bring the source into a protected workspace.', 'Attach a signed provenance identity.', 'See changes, checks, and confidence over time.', 'Share a report anyone can understand.'][index]}</p>{index < 3 && <ArrowRight className="absolute right-[-12px] top-2 hidden bg-white text-slate-300 md:block dark:bg-[#101c2d]" size={22} />}</div>)}</div></div></section>

      <section id="security" className="mx-auto max-w-7xl px-6 py-24 lg:px-10"><div className="panel grid gap-10 overflow-hidden p-8 md:grid-cols-[1fr_.85fr] md:p-12"><div><div className="mono-label text-blue-600 dark:text-blue-400">Designed for scrutiny</div><h2 className="mt-5 max-w-lg text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">A stronger standard for digital ownership.</h2><p className="mt-5 max-w-lg leading-7 text-slate-600 dark:text-slate-300">OCULIZ combines signed records, invisible protection, and forensic analysis so your team can move with confidence.</p><div className="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-300"><span className="flex items-center gap-3"><Check size={16} className="text-emerald-500" />Private by default</span><span className="flex items-center gap-3"><Check size={16} className="text-emerald-500" />Exportable evidence</span><span className="flex items-center gap-3"><Check size={16} className="text-emerald-500" />Clear confidence signals</span></div></div><div className="flex min-h-64 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><div className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950/40"><ShieldCheck size={30} /></div><div className="mono-label mt-5 text-slate-400">Proof is a product feature</div></div></div></div></section>

      <section id="faq" className="border-t border-slate-200 dark:border-slate-800"><div className="mx-auto max-w-3xl px-6 py-24"><div className="text-center"><div className="mono-label text-blue-600">Questions, answered</div><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">A clear start.</h2></div><div className="mt-12 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">{faqs.map(([question, answer], index) => <button key={question} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="block w-full py-6 text-left"><div className="flex items-center justify-between gap-6"><span className="font-medium text-slate-900 dark:text-white">{question}</span><ChevronDown size={18} className={`shrink-0 text-slate-400 transition ${openFaq === index ? 'rotate-180' : ''}`} /></div>{openFaq === index && <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{answer}</p>}</button>)}</div></div></section>

      <footer className="border-t border-slate-200 dark:border-slate-800"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-10"><span className="rounded-md bg-white px-2 py-1"><img src={logoUrl} alt="OCULIZ" className="h-10 w-auto" /></span><div className="flex items-center gap-6 text-sm text-slate-500"><Link href="/login" className="hover:text-blue-600">Sign in</Link><Link href="/register" className="hover:text-blue-600">Get started</Link><span>© 2026 OCULIZ</span></div></div></footer>
    </main>
  );
}
