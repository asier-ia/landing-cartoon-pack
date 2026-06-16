import { motion } from 'framer-motion'

const ITEMS = [
  '¡EL GRAN DUELO DE SABORES!',
  'VOTA POR TU FAVORITA',
  'RECIÉN SALIDAS DEL HORNO',
  'SOLO UNA SERÁ LA CAMPEONA',
]

export function MarqueeBanner() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <section id="duelo" className="overflow-hidden border-b-4 border-ink bg-retro-red py-3">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-heading text-sm text-cream sm:text-base"
          >
            {item}
            <span className="text-retro-yellow">★</span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
