'use client';

import { useEffect, useRef } from 'react';

type ParticleFieldProps = {
  className?: string;
  density?: number;
};

export function ParticleField({ className = '', density = 90 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    const points = Array.from({ length: density }, (_, index) => ({
      seed: index * 17.3,
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.6 + 0.4,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      frame += 0.008;
      context.clearRect(0, 0, width, height);
      points.forEach((point) => {
        const drift = Math.sin(frame + point.seed) * 12;
        const x = point.x * width + drift;
        const y = point.y * height + Math.cos(frame * 0.8 + point.seed) * 8;
        const alpha = 0.12 + (Math.sin(frame * 1.4 + point.seed) + 1) * 0.08;
        context.beginPath();
        context.fillStyle = `rgba(87, 145, 238, ${alpha})`;
        context.arc(x, y, point.size, 0, Math.PI * 2);
        context.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
