// SPDX-License-Identifier: Apache-2.0
// Copyright (C) 2026 Shogo Technologies, Inc.
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

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

const STILLS = [
  {
    title: 'Morning Light',
    span: 'col-span-1 row-span-2',
    gradient: 'from-[#C4A48A]/60 via-[#D4B89A]/40 to-[#B8977A]/70',
  },
  {
    title: 'Whisper',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#E8D5C4]/60 via-[#D4B89A]/40 to-[#C4A48A]/70',
  },
  {
    title: 'Tender',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#D4B89A]/70 via-[#C4A48A]/40 to-[#E8D5C4]/60',
  },
  {
    title: 'Ethereal',
    span: 'col-span-1 row-span-2',
    gradient: 'from-[#B8977A]/60 via-[#C4A48A]/40 to-[#A68B6B]/70',
  },
  {
    title: 'Solitude',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#C4A48A]/50 via-[#E8D5C4]/40 to-[#D4B89A]/70',
  },
  {
    title: 'Dance',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#D4B89A]/60 via-[#B8977A]/40 to-[#C4A48A]/70',
  },
  {
    title: 'Reverie',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#E8D5C4]/70 via-[#C4A48A]/40 to-[#D4B89A]/60',
  },
  {
    title: 'Still',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#B8977A]/50 via-[#D4B89A]/40 to-[#C4A48A]/70',
  },
  {
    title: 'Promise',
    span: 'col-span-1 row-span-2',
    gradient: 'from-[#C4A48A]/70 via-[#E8D5C4]/40 to-[#B8977A]/60',
  },
  {
    title: 'Bloom',
    span: 'col-span-1 row-span-1',
    gradient: 'from-[#D4B89A]/50 via-[#C4A48A]/40 to-[#E8D5C4]/70',
  },
]

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

/* ──────────────────────────── UTILS ─────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ────────────────────── SHARED COMPONENTS ───────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] uppercase tracking-[0.3em] text-[#A68B6B] mb-4 block">
      {children}
    </span>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

/* ─────────────────────── NAVBAR ────────────────────────────── */

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#FDF9F5]/90 backdrop-blur-xl border-b border-[#C4A48A]/10'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img
            src="/kpk-logo.png"
            alt="Kahani Pheron Ki"
            className="h-14 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={cn(
                'text-[12px] transition-colors duration-300 uppercase tracking-[0.2em]',
                scrolled
                  ? 'text-[#6B4F3A]/60 hover:text-[#3D2E1F]'
                  : 'text-white/80 hover:text-white',
              )}
            >
              {link}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={cn(
                'block h-px transition-all duration-300 origin-center',
                scrolled ? 'bg-[#6B4F3A]' : 'bg-white',
                mobileOpen && 'rotate-45 translate-y-[3.5px]',
              )}
            />
            <span
              className={cn(
                'block h-px transition-all duration-300 origin-center',
                scrolled ? 'bg-[#6B4F3A]' : 'bg-white',
                mobileOpen && '-rotate-45 -translate-y-[3.5px]',
              )}
            />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#3D2E1F]/90 backdrop-blur-xl border-t border-white/10 px-6 pb-6 pt-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white/70 hover:text-white transition-colors text-[13px] uppercase tracking-[0.2em]"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ──────────────────────── HOME ─────────────────────────────── */

function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/wedding-bg.mp4" type="video/mp4" />
      </video>

      {/* Warm cinematic overlay for text readability + brand feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D2E1F]/55 via-[#3D2E1F]/35 to-[#C4A48A]/45" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B89A] animate-pulse" />
            <span className="text-[10px] text-white/70 uppercase tracking-[0.3em]">
              Photography & Videography
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9] text-white mb-8 drop-shadow-lg">
            Kahani
            <br />
            <span className="text-[#D4B89A]">Pheron Ki</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-14 leading-relaxed font-light drop-shadow">
            Every love story deserves to be told with heart. Cinematic films
            and fine art photography for your most cherished moments.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#films"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#C4A48A] text-white text-sm font-medium hover:bg-[#B8977A] transition-colors shadow-lg"
            >
              Watch Our Films
            </a>
            <a
              href="#stories"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Client Stories
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-white/60 animate-[scroll_2.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}

/* ──────────────────────── ABOUT ────────────────────────────── */

function About() {
  return (
    <section id="about" className="py-28 md:py-36 bg-[#FDF9F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div>
              <SectionLabel>About Us</SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#3D2E1F] mb-8 leading-tight">
                We believe in the
                <br />
                <span className="text-[#C4A48A]">power of a moment.</span>
              </h2>
              <div className="space-y-5 text-[#6B4F3A]/70 leading-relaxed">
                <p>
                  Kahani Pheron Ki is a photography and filmmaking studio founded on a
                  single idea: every love story deserves to be told with the same
                  care as a feature film. We don't just document — we feel,
                  we observe, and we translate emotion into images and motion.
                </p>
                <p>
                  We travel wherever the story takes us. From intimate elopements in
                  the mountains to grand celebrations across continents, our lens
                  finds the quiet glances, the unscripted laughter, and the tears
                  that say more than words ever could.
                </p>
                <p>
                  Every project is a collaboration. We take the time to understand
                  who you are, so that what we create feels unmistakably yours.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8D5C4] via-[#D4B89A] to-[#C4A48A]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-3">
                      <div className="w-5 h-5 rounded-full bg-white/40" />
                    </div>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest">
                      Studio Portrait
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: '200+', label: 'Stories Told' },
                  { number: '12', label: 'Years' },
                  { number: '35+', label: 'Countries' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-xl bg-white/60 border border-[#C4A48A]/15 text-center"
                  >
                    <div className="text-xl font-bold text-[#3D2E1F] mb-0.5">
                      {stat.number}
                    </div>
                    <div className="text-[10px] text-[#6B4F3A]/50 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── FILMS ────────────────────────────── */

function Films() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <section id="films" className="py-28 md:py-36 bg-[#F5EDE7]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <SectionLabel>Films</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#3D2E1F]">
              Moving stories.
            </h2>
            <p className="text-[#6B4F3A]/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
              Each film is crafted like a short cinematic experience — scored,
              color-graded, and cut to make you feel something.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FILMS.map((film, i) => (
            <Reveal key={film.title} delay={i * 80}>
              <div
                className="group relative rounded-xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <div className={cn('relative', film.aspect)}>
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br transition-all duration-700',
                      film.gradient,
                    )}
                  />

                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-[#C4A48A]/10" />

                  {/* Play button */}
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center transition-all duration-500',
                      activeIdx === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
                    )}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/50">
                      <PlayIcon className="w-5 h-5 text-[#3D2E1F] ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/30 backdrop-blur-sm text-[10px] text-[#3D2E1F]/60 font-mono">
                    {film.duration}
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[9px] text-[#6B4F3A]/50 uppercase tracking-[0.2em] block mb-1">
                      {film.category}
                    </span>
                    <h3 className="text-[#3D2E1F] text-base font-semibold">
                      {film.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── STILLS ───────────────────────────── */

function Stills() {
  return (
    <section id="stills" className="py-28 md:py-36 bg-[#FDF9F5]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <SectionLabel>Stills</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#3D2E1F]">
              Frozen in time.
            </h2>
            <p className="text-[#6B4F3A]/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
              Fine art photography that finds beauty in the quiet — a glance,
              a touch, the light falling just right.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {STILLS.map((still, i) => (
            <Reveal
              key={still.title}
              delay={i * 60}
              className={still.span}
            >
              <div className="group relative h-full rounded-xl overflow-hidden cursor-pointer">
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br transition-all duration-700',
                    still.gradient,
                  )}
                />

                {/* Subtle light streak */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 40%)',
                  }}
                />

                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="text-[#3D2E1F] text-sm font-medium drop-shadow-sm">
                    {still.title}
                  </span>
                </div>

                {/* Corner detail on hover */}
                <div className="absolute top-3 right-3 w-0 h-0 group-hover:w-4 group-hover:h-4 border-t border-r border-[#3D2E1F]/20 transition-all duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── STORIES ──────────────────────────── */

function Stories() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null)

  return (
    <section id="stories" className="py-28 md:py-36 bg-[#F5EDE7]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <SectionLabel>Stories</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#3D2E1F]">
              Love, in their words.
            </h2>
            <p className="text-[#6B4F3A]/60 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              Every couple has a unique story. Here's a glimpse into the
              weddings and celebrations we've been honored to capture.
            </p>
          </div>
        </Reveal>

        <div className="space-y-24">
          {STORIES.map((story, idx) => {
            const isExpanded = expandedStory === idx
            return (
              <Reveal key={story.couple} delay={idx * 100}>
                <div className="space-y-8">
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
                    <button
                      onClick={() =>
                        setExpandedStory(isExpanded ? null : idx)
                      }
                      className="text-[11px] text-[#C4A48A] hover:text-[#B8977A] uppercase tracking-widest transition-colors self-start md:self-auto"
                    >
                      {isExpanded ? 'Collapse −' : 'View Story +'}
                    </button>
                  </div>

                  {/* Main image */}
                  <div className="relative rounded-2xl overflow-hidden">
                    <div className="aspect-[16/7]">
                      {'image' in story && story.image ? (
                        <img
                          src={story.image}
                          alt={story.couple}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={cn(
                            'absolute inset-0 bg-gradient-to-br',
                            story.gradient,
                          )}
                        />
                      )}
                      {/* Quote overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E1F]/40 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <blockquote className="text-lg md:text-xl text-white/90 font-light italic max-w-xl leading-relaxed drop-shadow-md">
                          {story.quote}
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  {/* Expanded gallery */}
                  <div
                    className={cn(
                      'grid gap-3 overflow-hidden transition-all duration-700 ease-out',
                      isExpanded
                        ? 'grid-cols-3 max-h-[800px] opacity-100'
                        : 'grid-cols-3 max-h-0 opacity-0',
                    )}
                  >
                    {story.extras.map((extra, ei) => (
                      <div
                        key={ei}
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
                          <div
                            className={cn(
                              'absolute inset-0 bg-gradient-to-br',
                              extra.gradient,
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  {idx < STORIES.length - 1 && (
                    <div className="pt-12">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C4A48A]/20 to-transparent" />
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── FOOTER ───────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-[#C4A48A]/15 bg-[#FDF9F5]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <img
            src="/kpk-logo.png"
            alt="Kahani Pheron Ki"
            className="h-16 w-auto object-contain"
          />

          {/* Tagline */}
          <p className="text-[13px] text-[#6B4F3A]/50 font-light text-center max-w-sm">
            Cinematic photography &amp; filmmaking for love stories that deserve
            to be remembered.
          </p>

          {/* Social */}
          <div className="flex items-center gap-8">
            {['Instagram', 'Vimeo', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[11px] text-[#6B4F3A]/40 hover:text-[#C4A48A] transition-colors uppercase tracking-[0.2em]"
              >
                {social}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <span className="text-[11px] text-[#6B4F3A]/30">
            © 2026 Kahani Pheron Ki. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ──────────────────────────── APP ───────────────────────────── */

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#FDF9F5]">
      <Navbar scrolled={scrolled} />
      <Home />
      <About />
      <Films />
      <Stills />
      <Stories />
      <Footer />
    </div>
  )
}
