import { motion } from 'framer-motion'
import { Star, Flame } from 'lucide-react'

const SPEED_LINES = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  top: `${15 + i * 18}%`,
  delay: i * 0.4,
  width: `${80 + i * 20}px`,
}))

const FLOATING_STARS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: `${10 + Math.random() * 80}%`,
  left: `${5 + Math.random() * 90}%`,
  delay: i * 0.6,
  size: 12 + Math.random() * 16,
}))

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-4 border-ink px-4 py-16 md:py-24"
    >
      {/* Sunburst */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
        style={{
          background:
            'repeating-conic-gradient(from 0deg at 50% 50%, #1A1A1A 0deg 6deg, transparent 6deg 12deg)',
        }}
      />

      {/* Speed lines */}
      {SPEED_LINES.map((line) => (
        <div
          key={line.id}
          aria-hidden
          className="speed-line"
          style={{
            top: line.top,
            left: 0,
            width: line.width,
            animationDelay: `${line.delay}s`,
          }}
        />
      ))}

      {/* Floating flames */}
      {FLOATING_STARS.map((star) => (
        <motion.div
          key={star.id}
          aria-hidden
          className="pointer-events-none absolute z-10"
          style={{ top: star.top, left: star.left }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 12, -6, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        >
          <Flame
            size={star.size}
            className="text-retro-red drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
          />
        </motion.div>
      ))}

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
          className="wobble mb-6 inline-flex items-center gap-2 rounded-full border-4 border-ink bg-retro-blue px-5 py-2 font-heading text-xs text-ink shadow-retro md:text-sm"
        >
           <Flame className="size-4 fill-ink" />
          Nuevo Pack de 3 Tortillas
          <Flame className="size-4 fill-ink" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
          className="font-heading text-4xl leading-[1.05] text-retro-red sm:text-6xl md:text-7xl"
        >
          <span className="block text-balance text-ink">¡El Gran Duelo</span>
          <span className="block text-balance">de Tortillas!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 max-w-xl text-pretty font-sans text-base font-medium leading-relaxed text-ink/80 md:text-lg"
        >
          Tres tortillas recién hechas salieron de la sartén y solo una puede ser la
          campeona. ¡Tú decides! Elige tu favorita y
          <span className="font-bold text-retro-red"> vota por la tortilla ganadora.</span>
        </motion.p>

        <motion.a
          href="#votar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.55 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          className="squash mt-8 rounded-full border-4 border-ink bg-retro-yellow px-8 py-4 font-heading text-base text-ink shadow-retro-lg transition-all hover:-translate-y-1 hover:shadow-retro-xl active:translate-y-1 active:shadow-none md:text-lg"
        >
          ¡Empieza a Votar!
        </motion.a>
      </div>
    </section>
  )
}
