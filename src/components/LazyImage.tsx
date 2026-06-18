import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/cn'

export default function LazyImage({
  src,
  alt,
  className = '',
  gradient = '',
  aspect = 'aspect-video',
}: {
  src: string
  alt: string
  className?: string
  gradient?: string
  aspect?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '200px' })

  return (
    <div ref={ref} className={cn(aspect, 'relative overflow-hidden', className)}>
      {gradient && (
        <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
      )}

      {inView && !error && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {(!loaded || !inView) && gradient && (
        <div className="absolute inset-0 animate-pulse" />
      )}
    </div>
  )
}
