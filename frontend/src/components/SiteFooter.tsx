import { motion } from 'framer-motion'
import { Camera, Cookie, Mail, MessageCircle, Music, Star } from 'lucide-react'
import { PopIn } from './PopIn'

const SOCIALS = [
  { label: 'Instagram', icon: Camera },
  { label: 'Mensajes', icon: MessageCircle },
  { label: 'Música', icon: Music },
  { label: 'Correo', icon: Mail },
]

const DECORATIVE_STARS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: `${15 + i * 25}%`,
  left: i % 2 === 0 ? '8%' : '92%',
  delay: i * 0.5,
  size: 14 + i * 4,
}))

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink px-4 py-20 text-cream">
      {/* Decorative floating stars */}
      {DECORATIVE_STARS.map((star) => (
        <motion.div
          key={star.id}
          aria-hidden
          className="pointer-events-none absolute"
          style={{ top: star.top, left: star.left }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 15, -8, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        >
          <Star
            size={star.size}
            className="text-retro-yellow/40"
          />
        </motion.div>
      ))}

      {/* Iris-out circle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 38%, #1A1A1A 39%)',
        }}
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <PopIn>
          <motion.span
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex size-16 items-center justify-center rounded-full border-4 border-cream bg-retro-red text-cream"
          >
            <Cookie className="size-8" />
          </motion.span>
        </PopIn>

        <PopIn delay={0.1}>
          <h2 className="font-heading text-4xl text-retro-yellow sm:text-5xl md:text-6xl">
            ¡Eso es todo,
            <span className="block text-cream">amigos!</span>
          </h2>
        </PopIn>

        <PopIn delay={0.2}>
          <p className="mt-5 max-w-md text-pretty font-sans text-sm font-medium leading-relaxed text-cream/80">
            Gracias por votar en el Gran Duelo de Sabores. Síguenos para
            descubrir a la galleta campeona y nuestros próximos estrenos.
          </p>
        </PopIn>

        <div className="mt-8 flex items-center gap-4">
          {SOCIALS.map(({ label, icon: Icon }, i) => (
            <motion.a
              key={label}
              href="#"
              aria-label={label}
              whileHover={{ y: -6, rotate: -8, scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              className="flex size-12 items-center justify-center rounded-full border-4 border-cream bg-cream text-ink shadow-[4px_4px_0px_0px_#D94352]"
            >
              <Icon className="size-5" />
            </motion.a>
          ))}
        </div>

        <p className="mt-10 font-heading text-xs text-cream/60">
          La Galletería Animada &copy; 1932 &middot; Hecho con cariño
        </p>
      </div>
    </footer>
  )
}
