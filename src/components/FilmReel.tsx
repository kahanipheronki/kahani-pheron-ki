import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'

const REEL_ITEMS = [
  { title: 'Weddings', count: '150+', gradient: 'from-[#C4A48A]/70 to-[#B8977A]/80' },
  { title: 'Pre-Weddings', count: '80+', gradient: 'from-[#D4B89A]/70 to-[#C4A48A]/80' },
  { title: 'Receptions', count: '120+', gradient: 'from-[#E8D5C4]/70 to-[#D4B89A]/80' },
  { title: 'Engagements', count: '60+', gradient: 'from-[#B8977A]/70 to-[#A68B6B]/80' },
  { title: 'Destination', count: '35+', gradient: 'from-[#C4A48A]/70 to-[#E8D5C4]/80' },
  { title: 'Elopements', count: '25+', gradient: 'from-[#D4B89A]/70 to-[#B8977A]/80' },
  { title: 'Candid', count: '200+', gradient: 'from-[#E8D5C4]/70 to-[#C4A48A]/80' },
  { title: 'Films', count: '90+', gradient: 'from-[#A68B6B]/70 to-[#C4A48A]/80' },
]

export default function FilmReel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  return (
    <section ref={containerRef} className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#A68B6B] mb-3 block">
            Our Expertise
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D2E1F]">
            Every celebration, captured.
          </h2>
        </motion.div>
      </div>

      <motion.div style={{ x }} className="flex gap-4 px-6">
        {REEL_ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className={cn(
              'relative flex-shrink-0 w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer group',
            )}
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-500', item.gradient)} />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <span className="text-4xl md:text-5xl font-bold text-white/20 self-end">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">{item.title}</h3>
                <span className="text-white/60 text-sm">{item.count} projects</span>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-white/20 rounded-tl-2xl m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
