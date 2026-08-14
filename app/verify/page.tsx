'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, FileCheck2, Fingerprint, ScanLine, ShieldCheck, Upload, X } from 'lucide-react';

const stages = ['Reading image', 'Inspecting provenance', 'Searching for watermark', 'Validating signature', 'Comparing fingerprint', 'Analyzing integrity', 'Generating verdict'];

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [stage, setStage] = useState(-1);
  const [dragging, setDragging] = useState(false);
  const verifying = stage >= 0 && stage < stages.length;
  const complete = stage === stages.length;

  useEffect(() => {
    if (!verifying) return;
    const timer = window.setTimeout(() => setStage((current) => current + 1), 650);
    return () => window.clearTimeout(timer);
  }, [stage, verifying]);

  const chooseFile = (next: File) => {
    if (!next.type.startsWith('image/')) return;
    setFile(next);
    setPreview(URL.createObjectURL(next));
    setStage(-1);
  };

  return <DashboardLayout><main className="mx-auto w-full max-w-7xl space-y-8 p-5 sm:p-8"><header><div className="mono-label text-blue-600 dark:text-blue-400">Forensic workspace / 01</div><h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">Verify an image.</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">See the evidence behind an ownership claim, from the first pixel read to the final confidence score.</p></header><div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><section className="panel p-5 sm:p-7"><div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-700"><div><div className="font-semibold text-slate-950 dark:text-white">Source image</div><div className="mt-1 text-sm text-slate-500">PNG, JPEG, WebP, or TIFF up to 50 MB</div></div><ScanLine className="text-blue-600" size={22} /></div><label onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); const next = event.dataTransfer.files[0]; if (next) chooseFile(next); }} className={`mt-6 flex min-h-[420px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition ${dragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'}`}>{preview ? <div className="relative h-full w-full p-5"><img src={preview} alt="Selected source" className="h-[360px] w-full rounded object-contain" /><button type="button" aria-label="Remove selected image" onClick={(event) => { event.preventDefault(); setFile(null); setPreview(null); setStage(-1); }} className="absolute right-8 top-8 rounded-full bg-slate-950/80 p-2 text-white"><X size={15} /></button></div> : <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300"><Upload size={24} /></div><div className="mt-5 font-medium text-slate-950 dark:text-white">Drop an image to begin</div><div className="mt-2 text-sm text-slate-500">or browse from your device</div></div>}<input type="file" accept="image/*" className="hidden" onChange={(event) => { const next = event.target.files?.[0]; if (next) chooseFile(next); }} /></label><div className="mt-5 flex gap-3"><Button className="flex-1" size="lg" disabled={!file || verifying} onClick={() => setStage(0)}><Eye size={17} />{verifying ? 'Analyzing source' : complete ? 'Analysis complete' : 'Start verification'}</Button>{complete && <Button variant="outline" onClick={() => setStage(-1)}>Reset</Button>}</div></section><aside className="space-y-6"><section className="panel p-6"><div className="flex items-center justify-between"><div className="font-semibold text-slate-950 dark:text-white">Analysis sequence</div><Badge variant={complete ? 'success' : verifying ? 'primary' : 'secondary'}>{complete ? 'Complete' : verifying ? 'Live' : 'Ready'}</Badge></div><div className="mt-6 space-y-3">{stages.map((item, index) => <div key={item} className={`flex items-center gap-3 rounded-md border p-3 text-sm transition ${index === stage ? 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200' : 'border-slate-200 text-slate-500 dark:border-slate-800'} `}><span className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] ${index < stage || complete ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : index === stage ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>{index < stage || complete ? <CheckCircle size={13} /> : `0${index + 1}`}</span><span>{item}</span>{index === stage && <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-blue-500" />}</div>)}</div></section>{complete && <section className="panel border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/20"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-600" /><div><div className="font-semibold text-emerald-900 dark:text-emerald-200">Ownership verified</div><div className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">The image passed all integrity checks.</div></div></div><div className="mt-6 grid grid-cols-2 gap-3 text-sm"><div className="rounded border border-emerald-200 bg-white/70 p-3 dark:border-emerald-900 dark:bg-slate-950/30"><div className="text-xs text-emerald-700/70">Confidence</div><div className="mt-1 text-xl font-semibold text-emerald-900 dark:text-emerald-100">99.8%</div></div><div className="rounded border border-emerald-200 bg-white/70 p-3 dark:border-emerald-900 dark:bg-slate-950/30"><div className="text-xs text-emerald-700/70">Fingerprint</div><div className="mt-1 flex items-center gap-2 font-mono text-xs text-emerald-900 dark:text-emerald-100"><Fingerprint size={13} />7d2c...a91f</div></div></div><Button variant="outline" className="mt-5 w-full"><FileCheck2 size={16} />Download technical report</Button></section>}</aside></div></main></DashboardLayout>;
}
