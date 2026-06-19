import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CinematicReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [4, 0, 0, 2])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -30])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
