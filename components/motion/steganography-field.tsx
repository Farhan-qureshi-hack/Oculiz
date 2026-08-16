'use client'

import { useEffect, useRef } from 'react'

type Formation = 'dust' | 'bits' | 'orbit' | 'matrix'

type SteganographyFieldProps = {
  formation?: Formation
  density?: number
  className?: string
  interactive?: boolean
}

const hash = (index: number, seed: number) => {
  const value = Math.sin(index * 91.733 + seed * 17.19) * 43758.5453
  return value - Math.floor(value)
}

export function SteganographyField({ formation = 'dust', density = 220, className = '', interactive = true }: SteganographyFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points = Array.from({ length: density }, (_, index) => {
      const angle = hash(index, 1) * Math.PI * 2
      const distance = Math.sqrt(hash(index, 2))
      const orbitX = 0.5 + Math.cos(angle) * distance * 0.43
      const orbitY = 0.5 + Math.sin(angle) * distance * 0.26
      const bitIndex = index % 24
      const bitRow = Math.floor(index / 24)
      return {
        dustX: hash(index, 3), dustY: hash(index, 4),
        orbitX, orbitY,
        bitX: 0.31 + bitIndex * 0.017,
        bitY: 0.23 + (bitRow % 20) * 0.028,
        matrixX: 0.18 + (index % 10) * 0.07,
        matrixY: 0.2 + Math.floor(index / 10) * 0.035,
        phase: hash(index, 5) * Math.PI * 2,
        radius: 0.55 + hash(index, 6) * 1.45,
      }
    })
    let width = 0
    let height = 0
    let progress = 0
    let targetProgress = 0
    let pointerX = 0.5
    let pointerY = 0.5
    let raf = 0
    let time = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.floor(width * scale))
      canvas.height = Math.max(1, Math.floor(height * scale))
      context.setTransform(scale, 0, 0, scale, 0, 0)
    }
    const readScroll = () => {
      const section = canvas.closest('section')
      const bounds = (section ?? canvas).getBoundingClientRect()
      targetProgress = Math.max(0, Math.min(1, (window.innerHeight * 0.78 - bounds.top) / Math.max(1, bounds.height - window.innerHeight * 0.22)))
    }
    const move = (event: PointerEvent) => {
      if (!interactive) return
      pointerX = event.clientX / Math.max(1, window.innerWidth)
      pointerY = event.clientY / Math.max(1, window.innerHeight)
    }
    const draw = () => {
      time += 0.012
      progress += (targetProgress - progress) * (reduced ? 0.16 : 0.028)
      context.clearRect(0, 0, width, height)
      const formationMix = formation === 'dust' ? progress : Math.min(1, progress * 1.35)
      points.forEach((point, index) => {
        const flutter = reduced ? 0 : Math.sin(time + point.phase) * 0.006
        let x = point.dustX + (point.orbitX - point.dustX) * formationMix
        let y = point.dustY + (point.orbitY - point.dustY) * formationMix
        if (formation === 'bits') {
          x += (point.bitX - x) * Math.max(0, formationMix - 0.3) / 0.7
          y += (point.bitY - y) * Math.max(0, formationMix - 0.3) / 0.7
        }
        if (formation === 'matrix') {
          x += (point.matrixX - x) * Math.max(0, formationMix - 0.25) / 0.75
          y += (point.matrixY - y) * Math.max(0, formationMix - 0.25) / 0.75
        }
        const parallax = interactive ? (pointerX - 0.5) * 0.025 * (1 - progress) : 0
        x = (x + flutter + parallax) * width
        y = (y + flutter + (interactive ? (pointerY - 0.5) * 0.018 * (1 - progress) : 0)) * height
        const alpha = 0.15 + progress * 0.58 + Math.sin(time * 1.6 + index) * 0.04
        const size = point.radius + progress * 0.7
        context.beginPath()
        context.fillStyle = `rgba(104, 167, 255, ${Math.max(0.08, alpha)})`
        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()
        if (progress > 0.5 && index % 18 === 0) {
          const next = points[index + 1]
          if (next) {
            context.strokeStyle = `rgba(119, 180, 255, ${0.18 * progress})`
            context.lineWidth = 0.6
            context.beginPath()
            context.moveTo(x, y)
            context.lineTo((next.dustX + (next.orbitX - next.dustX) * formationMix) * width, (next.dustY + (next.orbitY - next.dustY) * formationMix) * height)
            context.stroke()
          }
        }
      })
      raf = requestAnimationFrame(draw)
    }
    resize()
    readScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('pointermove', move)
    }
  }, [density, formation, interactive])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
