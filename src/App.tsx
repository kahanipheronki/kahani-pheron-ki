// SPDX-License-Identifier: Apache-2.0
// Copyright (C) 2026 Shogo Technologies, Inc.
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { ThemeProvider, useTheme } from '@/components/ThemeContext'
import Loader from '@/components/Loader'
import CustomCursor from '@/components/CustomCursor'
import CursorTrail from '@/components/CursorTrail'
import ScrollToTop from '@/components/ScrollToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import MagneticButton from '@/components/MagneticButton'
import ThemeToggle from '@/components/ThemeToggle'
import FilmReel from '@/components/FilmReel'
import Contact from '@/components/Contact'
import VideoLightbox from '@/components/VideoLightbox'
import ImageLightbox from '@/components/ImageLightbox'
import Typewriter from '@/components/Typewriter'
import CinematicReveal from '@/components/CinematicReveal'

/* ──────────────────────────── DATA ──────────────────────────── */

const NAV_LINKS = ['Home', 'About', 'Films', 'Stills', 'Stories'] as const

const FILMS = [
  {
    title: 'The Last Dance',
    category: 'Wedding Film',
    duration: '8:24',
    gradient: 'from-[#C4A48A]/40 via-[#D4B89A]/30 to-[#B8977A]/50',
    aspect: 'aspect-video',
  },
  {
    title: 'City of Light',
    category: 'Destination',
    duration: '5:12',
    gradient: 'from-[#D4B89A]/50 via-[#E8D5C4]/30 to-[#C4A48A]/40',
    aspect: 'aspect-video',
  },
  {
    title: 'Wild & Free',
    category: 'Adventure',
    duration: '6:48',
    gradient: 'from-[#B8977A]/40 via-[#C4A48A]/30 to-[#A68B6B]/50',
    aspect: 'aspect-video',
  },
  {
    title: 'Forever Begins',
    category: 'Short Film',
    duration: '12:03',
    gradient: 'from-[#D4B89A]/40 via-[#C4A48A]/30 to-[#E8D5C4]/50',
    aspect: 'aspect-video',
  },
  {
    title: 'Golden Hour',
    category: 'Engagement',
    duration: '4:36',
    gradient: 'from-[#C4A48A]/50 via-[#B8977A]/30 to-[#D4B89A]/40',
    aspect: 'aspect-video',
  },
  {
    title: 'Still Waters',
    category: 'Elopement',
    duration: '7:15',
    gradient: 'from-[#E8D5C4]/40 via-[#C4A48A]/30 to-[#D4B89A]/50',
    aspect: 'aspect-video',
  },
]

const STILLS: { title: string; span: string; gradient: string; src?: string }[] = []

const STORIES = [
  {
    couple: 'Atish & Vanshika',
    date: '2025',
    location: 'Maharashtra',
    quote: '"In her mother\'s eyes, Vanshika will always be her little girl. A quiet, beautiful moment of love and legacy before stepping into her forever."',
    layout: 'wide',
    gradient: 'from-[#C4A48A]/50 via-[#D4B89A]/30 to-[#B8977A]/60',
    image: '/A_V_KPK_9.jpg',
    extras: [
      { image: '/A_V_KPK_1.jpg', gradient: 'from-[#E8D5C4]/50 to-[#C4A48A]/60', span: 'col-span-1 row-span-1' },
      { image: '/A_V_KPK_3.jpg', gradient: 'from-[#D4B89A]/50 to-[#B8977A]/60', span: 'col-span-1 row-span-1' },
      { image: '/A_V_KPK_4.jpg', gradient: 'from-[#C4A48A]/50 to-[#D4B89A]/60', span: 'col-span-1 row-span-2' },
    ],
  },
  {
    couple: 'Elena & Marco',
    date: 'January 2026',
    location: 'Tuscany, Italy',
    quote: '"We wanted the film to feel like a dream we never wanted to wake from."',
    layout: 'split',
    gradient: 'from-[#B8977A]/50 via-[#C4A48A]/30 to-[#D4B89A]/60',
    extras: [
      { gradient: 'from-[#C4A48A]/50 to-[#E8D5C4]/60', span: 'col-span-1 row-span-1' },
      { gradient: 'from-[#D4B89A]/50 to-[#B8977A]/60', span: 'col-span-1 row-span-1' },
    ],
  },
  {
    couple: 'Sarah & James',
    date: 'December 2025',
    location: 'Kyoto, Japan',
    quote: '"Every frame is a memory we will treasure forever."',
    layout: 'gallery',
    gradient: 'from-[#D4B89A]/50 via-[#E8D5C4]/30 to-[#C4A48A]/60',
    extras: [
      { gradient: 'from-[#C4A48A]/50 to-[#B8977A]/60', span: 'col-span-1 row-span-1' },
      { gradient: 'from-[#E8D5C4]/50 to-[#D4B89A]/60', span: 'col-span-1 row-span-1' },
      { gradient: 'from-[#B8977A]/50 to-[#C4A48A]/60', span: 'col-span-1 row-span-1' },
    ],
  },
  {
    couple: 'Aisha & David',
    date: 'November 2025',
    location: 'Santorini, Greece',
    quote: '"They didn\'t just capture our wedding — they captured our soul."',
    layout: 'wide',
    gradient: 'from-[#E8D5C4]/50 via-[#C4A48A]/30 to-[#D4B89A]/60',
    extras: [
      { gradient: 'from-[#D4B89A]/50 to-[#B8977A]/60', span: 'col-span-1 row-span-1' },
      { gradient: 'from-[#C4A48A]/50 to-[#E8D5C4]/60', span: 'col-span-1 row-span-1' },
    ],
  },
]

/* ────────────────────── ANIMATION VARIANTS ───────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/* ──────────────────────────── HOOKS ──────────────────────────── */

function useAnimatedCounter(end: number, duration: number = 2) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return { ref, count }
}

/* ────────────────────── SHARED COMPONENTS ───────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="text-[11px] uppercase tracking-[0.3em] text-[#A68B6B] mb-4 block"
    >
      {children}
    </motion.span>
  )
}

function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full h-px bg-gradient-to-r from-transparent via-[#C4A48A]/25 to-transparent origin-center"
    />
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#C4A48A]/10 pointer-events-none"
      style={{ width: size, height: size, left: `${x}%` }}
      initial={{ bottom: '-5%', opacity: 0 }}
      animate={{
        bottom: ['0%', '100%'],
        opacity: [0, 0.6, 0],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

/* ─────────────────────── NAVBAR ────────────────────────────── */

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? cn(
              'backdrop-blur-xl border-b border-[#C4A48A]/10',
              isDark ? 'bg-[#1a1210]/90' : 'bg-[#FDF9F5]/90',
            )
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center"
        >
          <img
            src="/kpk-logo.png"
            alt="Kahani Pheron Ki"
            className="h-14 w-auto object-contain"
          />
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              whileHover={{ y: -2 }}
              className={cn(
                'text-[12px] transition-colors duration-300 uppercase tracking-[0.2em]',
                scrolled
                  ? 'text-[#6B4F3A]/60 hover:text-[#3D2E1F]'
                  : 'text-white/80 hover:text-white',
              )}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className={cn(scrolled ? '' : 'text-white')}>
            <ThemeToggle />
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
          <div className="w-5 flex flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn('block h-px transition-colors duration-300', scrolled ? 'bg-[#6B4F3A]' : 'bg-white')}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={cn('block h-px transition-colors duration-300', scrolled ? 'bg-[#6B4F3A]' : 'bg-white')}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn('block h-px transition-colors duration-300', scrolled ? 'bg-[#6B4F3A]' : 'bg-white')}
            />
          </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#3D2E1F]/90 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 pb-6 pt-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-3 text-white/70 hover:text-white transition-colors text-[13px] uppercase tracking-[0.2em]"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ──────────────────────── HOME ─────────────────────────────── */

function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch(() => {})
    }
  }, [isMobile])

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7])
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const ringOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video with parallax */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay={!isMobile}
          muted
          loop
          playsInline
          preload={isMobile ? 'none' : 'auto'}
          poster="/A_V_KPK_9.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {!isMobile && <source src="/wedding-bg.mp4" type="video/mp4" />}
        </video>
      </motion.div>

      {/* Warm cinematic overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#3D2E1F]/55 via-[#3D2E1F]/35 to-[#C4A48A]/45"
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative rings with parallax */}
      <motion.div
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-[500px] h-[500px] border border-white/10 rounded-full"
        />
      </motion.div>
      <motion.div
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="w-[700px] h-[700px] border border-white/5 rounded-full"
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 2} x={15 + i * 14} size={4 + (i % 3) * 2} />
      ))}

      {/* Content with parallax */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B89A] animate-pulse" />
              <span className="text-[10px] text-white/70 uppercase tracking-[0.3em]">
                Photography & Videography
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9] text-white mb-8 drop-shadow-lg"
          >
            <span className="inline-block">Kahani</span>
            <br />
            <motion.span
              className="text-[#D4B89A] inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Pheron Ki
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-14 leading-relaxed font-light drop-shadow"
          >
            Every love story deserves to be told with heart.{' '}
            <Typewriter
              texts={[
                'Cinematic films for your most cherished moments.',
                'Fine art photography with soul and emotion.',
                'Destination weddings across the globe.',
                'Your story, captured forever.',
              ]}
              className="text-[#D4B89A]"
            />
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <motion.a
                href="#films"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(196, 164, 138, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#C4A48A] text-white text-sm font-medium hover:bg-[#B8977A] transition-colors shadow-lg"
              >
                Watch Our Films
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href="#stories"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/30 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Client Stories
              </motion.a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[9px] text-white/40 uppercase tracking-[0.3em]"
        >
          Scroll
        </motion.span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-1/2 bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────── ABOUT ────────────────────────────── */

function About() {
  const { ref: statsRef, count: stories } = useAnimatedCounter(200, 2.5)
  const { ref: yearsRef, count: years } = useAnimatedCounter(12, 2)
  const { ref: countriesRef, count: countries } = useAnimatedCounter(35, 2.5)

  const stats = [
    { ref: statsRef, count: stories, suffix: '+', label: 'Stories Told' },
    { ref: yearsRef, count: years, suffix: '', label: 'Years' },
    { ref: countriesRef, count: countries, suffix: '+', label: 'Countries' },
  ]

  return (
    <section id="about" className="py-28 md:py-36 bg-[#FDF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionLabel>About Us</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#3D2E1F] mb-8 leading-tight">
              We believe in the
              <br />
              <span className="text-[#C4A48A]">power of a moment.</span>
            </h2>
            <div className="space-y-5 text-[#6B4F3A]/70 leading-relaxed">
              <motion.p
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Kahani Pheron Ki is a photography and filmmaking studio founded on a
                single idea: every love story deserves to be told with the same
                care as a feature film. We don't just document — we feel,
                we observe, and we translate emotion into images and motion.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                We travel wherever the story takes us. From intimate elopements in
                the mountains to grand celebrations across continents, our lens
                finds the quiet glances, the unscripted laughter, and the tears
                that say more than words ever could.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Every project is a collaboration. We take the time to understand
                who you are, so that what we create feels unmistakably yours.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6"
          >
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(196, 164, 138, 0.15)' }}
                  className="p-5 rounded-xl bg-white/60 border border-[#C4A48A]/15 text-center cursor-default"
                >
                  <div ref={stat.ref} className="text-xl font-bold text-[#3D2E1F] mb-0.5">
                    {stat.count}{stat.suffix}
                  </div>
                  <div className="text-[10px] text-[#6B4F3A]/50 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── FILMS ────────────────────────────── */

function FilmCard({ film, index }: { film: typeof FILMS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  function handleMouse(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  function openLightbox() {
    window.dispatchEvent(new CustomEvent('open-video-lightbox', { detail: { src: '', title: film.title } }))
  }

  return (
    <motion.div
      variants={scaleUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        onClick={openLightbox}
        className="group relative rounded-xl overflow-hidden cursor-pointer"
      >
        <div className={cn('relative', film.aspect)}>
          <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-700', film.gradient)} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-[#C4A48A]/10" />

          {/* Hover play overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center"
            >
              <PlayIcon className="w-5 h-5 text-[#3D2E1F] ml-0.5" />
            </motion.div>
          </motion.div>

          {/* Duration badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/30 backdrop-blur-sm text-[10px] text-[#3D2E1F]/60 font-mono">
            {film.duration}
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="text-[9px] text-[#6B4F3A]/50 uppercase tracking-[0.2em] block mb-1">
              {film.category}
            </span>
            <h3 className="text-[#3D2E1F] text-base font-semibold">{film.title}</h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Films() {
  return (
    <section id="films" className="py-28 md:py-36 bg-[#F5EDE7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel>Films</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#3D2E1F]">
            Moving stories.
          </h2>
          <p className="text-[#6B4F3A]/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Each film is crafted like a short cinematic experience — scored,
            color-graded, and cut to make you feel something.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {FILMS.map((film, i) => (
            <FilmCard key={film.title} film={film} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── STILLS ───────────────────────────── */

function Stills() {
  function openStillsLightbox(index: number) {
    const imgs = STILLS.map(s => ({ src: `/A_V_KPK_${index + 1}.jpg`, alt: s.title }))
    window.dispatchEvent(new CustomEvent('open-image-lightbox', { detail: { images: imgs.length ? imgs : [{ src: '', alt: 'Portfolio' }], index: 0 } }))
  }

  return (
    <section id="stills" className="py-28 md:py-36 bg-[#FDF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel>Stills</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#3D2E1F]">
            Frozen in time.
          </h2>
          <p className="text-[#6B4F3A]/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Fine art photography that finds beauty in the quiet — a glance,
            a touch, the light falling just right.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {STILLS.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="col-span-full flex items-center justify-center h-48 text-[#6B4F3A]/30 text-sm"
            >
              Stills coming soon...
            </motion.div>
          ) : (
            STILLS.map((still, i) => (
              <motion.div
                key={still.title}
                variants={scaleUp}
                custom={i}
                className={still.span}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="group relative h-full rounded-xl overflow-hidden cursor-pointer"
                >
                  {still.src ? (
                    <img src={still.src} alt={still.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-700', still.gradient)} />
                  )}

                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 40%)' }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[#3D2E1F] text-sm font-medium drop-shadow-sm">
                      {still.title}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 w-0 h-0 group-hover:w-4 group-hover:h-4 border-t border-r border-[#3D2E1F]/20 transition-all duration-300" />
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── STORIES ──────────────────────────── */

function StoryCard({ story, index }: { story: typeof STORIES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="space-y-8"
    >
      {/* Story header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#3D2E1F] tracking-tight">
            {story.couple}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-[#6B4F3A]/50 uppercase tracking-widest">
            <span>{story.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#C4A48A]/40" />
            <span>{story.location}</span>
          </div>
        </div>
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ x: expanded ? -3 : 3 }}
          whileTap={{ scale: 0.95 }}
          className="text-[11px] text-[#C4A48A] hover:text-[#B8977A] uppercase tracking-widest transition-colors self-start md:self-auto"
        >
          {expanded ? 'Collapse −' : 'View Story +'}
        </motion.button>
      </div>

      {/* Main image */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="aspect-[16/7]">
          {'image' in story && story.image ? (
            <img
              src={story.image}
              alt={story.couple}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className={cn('absolute inset-0 bg-gradient-to-br', story.gradient)} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E1F]/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <blockquote className="text-lg md:text-xl text-white/90 font-light italic max-w-xl leading-relaxed drop-shadow-md">
              {story.quote}
            </blockquote>
          </div>
        </div>
      </motion.div>

      {/* Expanded gallery with AnimatePresence */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3"
            >
              {story.extras.map((extra, ei) => (
                <motion.div
                  key={ei}
                  variants={scaleUp}
                  custom={ei}
                  whileHover={{ scale: 1.04 }}
                  className={cn(
                    'relative rounded-xl overflow-hidden',
                    extra.span,
                    ei === 0 ? 'aspect-[3/4]' : 'aspect-square',
                  )}
                >
                  {'image' in extra && extra.image ? (
                    <img
                      src={extra.image}
                      alt={`${story.couple} - ${ei + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={cn('absolute inset-0 bg-gradient-to-br', extra.gradient)} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Stories() {
  return (
    <section id="stories" className="py-28 md:py-36 bg-[#F5EDE7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <SectionLabel>Stories</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#3D2E1F]">
            Love, in their words.
          </h2>
          <p className="text-[#6B4F3A]/60 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Every couple has a unique story. Here's a glimpse into the
            weddings and celebrations we've been honored to capture.
          </p>
        </motion.div>

        <div className="space-y-24">
          {STORIES.map((story, idx) => (
            <div key={story.couple}>
              <StoryCard story={story} index={idx} />
              {idx < STORIES.length - 1 && (
                <div className="pt-12">
                  <SectionDivider />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── FOOTER ───────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-[#C4A48A]/15 bg-[#FDF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <motion.img
            variants={scaleUp}
            whileHover={{ scale: 1.05 }}
            src="/kpk-logo.png"
            alt="Kahani Pheron Ki"
            className="h-16 w-auto object-contain"
          />

          <motion.p
            variants={fadeUp}
            className="text-[13px] text-[#6B4F3A]/50 font-light text-center max-w-sm"
          >
            Cinematic photography &amp; filmmaking for love stories that deserve
            to be remembered.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-8">
            <motion.a
              href="https://www.instagram.com/kahanipheronki"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#C4A48A' }}
              className="text-[11px] text-[#6B4F3A]/40 transition-colors uppercase tracking-[0.2em]"
            >
              Instagram
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2, color: '#C4A48A' }}
              className="text-[11px] text-[#6B4F3A]/40 transition-colors uppercase tracking-[0.2em]"
            >
              Vimeo
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2, color: '#C4A48A' }}
              className="text-[11px] text-[#6B4F3A]/40 transition-colors uppercase tracking-[0.2em]"
            >
              YouTube
            </motion.a>
          </motion.div>

          <motion.span variants={fadeIn} className="text-[11px] text-[#6B4F3A]/30">
            © 2026 Kahani Pheron Ki. All rights reserved.
          </motion.span>
        </motion.div>
      </div>
    </footer>
  )
}

/* ──────────────────────────── APP ───────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C4A48A] via-[#D4B89A] to-[#C4A48A] origin-left z-[60]"
    />
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

function AppInner() {
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={cn('min-h-screen scroll-smooth transition-colors duration-500', isDark ? 'bg-[#1a1210] text-white' : 'bg-[#FDF9F5] text-[#3D2E1F]')}>
      <Loader isLoading={loading} />
      <CustomCursor />
      <CursorTrail />
      <ScrollProgress />
      <VideoLightbox />
      <ImageLightbox />
      <Navbar scrolled={scrolled} />
      <Home />
      <CinematicReveal>
        <SectionDivider />
      </CinematicReveal>
      <CinematicReveal>
        <About />
      </CinematicReveal>
      <CinematicReveal>
        <SectionDivider />
      </CinematicReveal>
      <FilmReel />
      <CinematicReveal>
        <SectionDivider />
      </CinematicReveal>
      <Films />
      <CinematicReveal>
        <SectionDivider />
      </CinematicReveal>
      <Stills />
      <CinematicReveal>
        <SectionDivider />
      </CinematicReveal>
      <Stories />
      <CinematicReveal>
        <SectionDivider />
      </CinematicReveal>
      <Contact />
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  )
}
