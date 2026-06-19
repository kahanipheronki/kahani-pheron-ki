import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'

interface Layer {
  depth: number
  content: React.ReactNode
  className?: string
}

export default function ParallaxLayers({ layers, className = '' }: { layers: Layer[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={ref} className={cn('relative', className)}>
      {layers.map((layer, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [layer.depth * 100, layer.depth * -100])
        return (
          <motion.div
            key={i}
            style={{ y }}
            className={cn('absolute inset-0', layer.className)}
          >
            {layer.content}
          </motion.div>
        )
      })}
    </div>
  )
}
