'use client'

import { useEffect, useRef } from 'react'

type MorphingParticleFieldProps = {
  className?: string
  density?: number
}

function hash(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

export function MorphingParticleField({ className = '', density = 180 }: MorphingParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points = Array.from({ length: density }, (_, index) => {
      const randomX = hash(index, 1)
      const randomY = hash(index, 2)
      const angle = (index / density) * Math.PI * 14
      const radius = 0.12 + hash(index, 3) * 0.36
      return {
        x: randomX,
        y: randomY,
        organizedX: 0.5 + Math.cos(angle) * radius,
        organizedY: 0.5 + Math.sin(angle) * radius * 0.62,
        identityX: 0.5 + (index % 18 - 9) * 0.025 + Math.sin(index) * 0.03,
        identityY: 0.18 + Math.floor(index / 18) * 0.07 + Math.cos(index * 0.7) * 0.025,
        size: 0.5 + hash(index, 4) * 1.2,
      }
    })

    let width = 0
    let height = 0
    let scrollProgress = 0
    let targetProgress = 0
    let frame = 0
    let raf = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = width * scale
      canvas.height = height * scale
      context.setTransform(scale, 0, 0, scale, 0, 0)
    }
    const onScroll = () => {
      const bounds = canvas.getBoundingClientRect()
      const viewport = window.innerHeight
      targetProgress = Math.max(0, Math.min(1, (viewport * 0.75 - bounds.top) / Math.max(1, bounds.height - viewport * 0.25)))
    }
    const draw = () => {
      frame += 1
      scrollProgress = reduced ? 0.48 : scrollProgress + (targetProgress - scrollProgress) * 0.08
      context.clearRect(0, 0, width, height)
      points.forEach((point, index) => {
        const phase = Math.max(0, Math.min(1, scrollProgress * 1.32))
        const morph = phase < 0.65 ? phase / 0.65 : (phase - 0.65) / 0.35
        const firstX = point.x + (point.organizedX - point.x) * Math.min(1, phase * 1.5)
        const firstY = point.y + (point.organizedY - point.y) * Math.min(1, phase * 1.5)
        const xNorm = firstX + (point.identityX - firstX) * morph * 0.72
        const yNorm = firstY + (point.identityY - firstY) * morph * 0.72
        const drift = reduced ? 0 : Math.sin(frame * 0.012 + index) * 0.004 * (1 - phase)
        const x = (xNorm + drift) * width
        const y = (yNorm + drift) * height
        const alpha = 0.12 + Math.min(0.6, phase * 0.45) + Math.sin(index * 2 + frame * 0.02) * 0.04
        context.beginPath()
        context.fillStyle = `rgba(82, 145, 244, ${alpha})`
        context.arc(x, y, point.size + phase * 0.45, 0, Math.PI * 2)
        context.fill()
        if (phase > 0.45 && index % 9 === 0) {
          context.strokeStyle = `rgba(82, 145, 244, ${0.08 * phase})`
          context.lineWidth = 0.5
          context.beginPath()
          context.moveTo(x, y)
          context.lineTo(width * 0.5, height * 0.5)
          context.stroke()
        }
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    onScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
