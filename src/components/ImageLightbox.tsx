import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'

interface ImageItem {
  src: string
  alt: string
}

export default function ImageLightbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<ImageItem[]>([])
  const [index, setIndex] = useState(0)

  const open = useCallback((imgs: ImageItem[], idx: number) => {
    setImages(imgs)
    setIndex(idx)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [])

  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close, next, prev])

  useEffect(() => {
    const handler = (e: CustomEvent) => open(e.detail.images, e.detail.index || 0)
    window.addEventListener('open-image-lightbox' as string, handler as EventListener)
    return () => window.removeEventListener('open-image-lightbox' as string, handler as EventListener)
  }, [open])

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) prev()
    else if (info.offset.x < -80) next()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={close}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </motion.button>

          {/* Counter */}
          <div className="absolute top-6 left-6 z-10 text-white/40 text-sm font-mono">
            {index + 1} / {images.length}
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </>
          )}

          {/* Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-5xl mx-16 md:mx-24"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDrag}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                src={images[index]?.src}
                alt={images[index]?.alt}
                className="w-full max-h-[80vh] object-contain rounded-lg select-none"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
