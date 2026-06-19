import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  const createParticle = useCallback((x: number, y: number) => {
    for (let i = 0; i < 2; i++) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.5,
        size: 2 + Math.random() * 3,
        hue: 30 + Math.random() * 20,
      })
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frameCount = 0
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      frameCount++
      if (frameCount % 2 === 0) createParticle(e.clientX, e.clientY)
    }
    document.addEventListener('mousemove', move)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.life > 0)
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02
        p.vx *= 0.98
        p.life -= 0.02 / p.maxLife

        const alpha = p.life * 0.6
        const size = p.size * p.life

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${alpha})`
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${alpha * 0.15})`
        ctx.fill()
      }

      raf.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[98] pointer-events-none hidden md:block"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
