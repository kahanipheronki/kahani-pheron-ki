import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D2E1F] via-[#4A3828] to-[#2C2018]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }} />

          <div className="relative z-10 p-10 md:p-16 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — copy */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#C4A48A] mb-4 block">
                  Let's Talk
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                  Your story<br />
                  <span className="text-[#D4B89A]">starts here.</span>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-md mb-10">
                  Tell us about your celebration — the date, the venue, the feeling
                  you want to carry forever. We'll get back within 24 hours.
                </p>

                <div className="space-y-4">
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-[#C4A48A] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C4A48A]/30 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider block">WhatsApp</span>
                      <span className="text-sm">+91 99999 99999</span>
                    </div>
                  </a>

                  <a href="mailto:hello@kahaniopheronki.com"
                    className="flex items-center gap-3 text-white/60 hover:text-[#C4A48A] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C4A48A]/30 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider block">Email</span>
                      <span className="text-sm">hello@kahaniopheronki.com</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 text-white/60">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider block">Studio</span>
                      <span className="text-sm">Maharashtra, India</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right — form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#C4A48A]/20 flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4A48A" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/40 text-sm">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Your Name</label>
                        <input
                          required
                          className={cn(
                            "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4A48A]/40 transition-colors"
                          )}
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
                        <input
                          type="email"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4A48A]/40 transition-colors"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Wedding Date</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4A48A]/40 transition-colors"
                        placeholder="e.g. February 2027"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5 block">Tell us your story</label>
                      <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4A48A]/40 transition-colors resize-none"
                        placeholder="Venue, guest count, vision..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-full bg-[#C4A48A] text-white text-sm font-medium hover:bg-[#B8977A] transition-colors"
                    >
                      Send Inquiry
                    </motion.button>
                    <p className="text-[10px] text-white/20 text-center">No spam. Just a genuine conversation about your day.</p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
