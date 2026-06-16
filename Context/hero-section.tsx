"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-4 border-ink px-4 py-16 md:py-24"
    >
      {/* decorative sunburst stripes */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, var(--ink) 0deg 6deg, transparent 6deg 12deg)",
        }}
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border-4 border-ink bg-retro-blue px-5 py-2 font-heading text-xs text-ink shadow-retro md:text-sm"
        >
          <Star className="size-4 fill-ink" />
          Nuevo Pack de 3 Sabores
          <Star className="size-4 fill-ink" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
          className="font-heading text-4xl leading-[1.05] text-retro-red sm:text-6xl md:text-7xl"
        >
          <span className="block text-balance text-ink">¡El Gran Duelo</span>
          <span className="block text-balance">de Sabores!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 max-w-xl text-pretty font-sans text-base font-medium leading-relaxed text-foreground md:text-lg"
        >
          Tres galletas nuevecitas salieron del horno y solo una puede ser la
          campeona. ¡Tú decides! Prueba con la vista, elige tu favorita y
          <span className="font-bold text-retro-red"> vota por el sabor ganador.</span>
        </motion.p>

        <motion.a
          href="#votar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.55 }}
          className="mt-8 rounded-full border-4 border-ink bg-retro-yellow px-8 py-4 font-heading text-base text-ink shadow-retro-lg transition-all hover:-translate-y-1 hover:shadow-retro-xl active:translate-y-1 active:shadow-none md:text-lg"
        >
          ¡Empieza a Votar!
        </motion.a>
      </div>
    </section>
  )
}
