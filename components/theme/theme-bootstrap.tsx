'use client'

import { useEffect } from 'react'

export function ThemeBootstrap() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('oculiz-theme')
      const dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    } catch {
      // Theme preference is optional; keep the default token system.
    }
  }, [])
  return null
}
