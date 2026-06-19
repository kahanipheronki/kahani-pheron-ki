import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoLightbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const [title, setTitle] = useState('')

  const open = useCallback((src: string, t: string) => {
    setVideoSrc(src)
    setTitle(t)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setVideoSrc('')
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])

  useEffect(() => {
    const handler = (e: CustomEvent) => open(e.detail.src, e.detail.title)
    window.addEventListener('open-video-lightbox' as string, handler as EventListener)
    return () => window.removeEventListener('open-video-lightbox' as string, handler as EventListener)
  }, [open])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={close}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </motion.button>

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-5xl mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            {videoSrc ? (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#C4A48A]/20 to-[#3D2E1F]/40">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" opacity="0.6"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p className="text-white/60 text-sm">{title}</p>
                  <p className="text-white/30 text-xs mt-2">Film preview coming soon</p>
                </div>
              </div>
            )}

            {title && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-6"
              >
                <h3 className="text-white text-xl font-semibold">{title}</h3>
                <p className="text-white/40 text-sm mt-1">Kahani Pheron Ki — Cinematic Wedding Films</p>
              </motion.div>
            )}
          </motion.div>

          {/* Film grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
