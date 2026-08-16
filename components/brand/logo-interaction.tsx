'use client';

import { useState } from 'react';
import Link from 'next/link';

const logoUrl = '/brand/oculiz-logo.png';

export function LogoInteraction({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(false);
  return (
    <Link
      href="/"
      aria-label="OCULIZ home"
      onClick={() => {
        setActive(true);
        window.setTimeout(() => setActive(false), 2100);
      }}
      className={`logo-trigger relative inline-flex rounded-md bg-white px-2 py-1 shadow-sm ${active ? 'logo-trigger-active' : ''}`}
    >
      <img src={logoUrl} alt="OCULIZ — Protect. Verify. Own." className={compact ? 'h-9 w-auto' : 'h-12 w-auto'} />
      {active && <span aria-hidden="true" className="logo-particles">••• · · •••</span>}
    </Link>
  );
}
