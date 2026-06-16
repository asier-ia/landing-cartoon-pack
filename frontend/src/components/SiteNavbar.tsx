import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#duelo', label: 'El Duelo' },
  { href: '#votar', label: 'Sabores' },
  { href: '#resultados', label: 'Resultados' },
]

const menuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-cream/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <span className="flex size-9 min-w-9 items-center justify-center rounded-full border-4 border-ink bg-retro-red text-cream shadow-retro md:size-10">
            <Cookie className="size-4 md:size-5" />
          </span>
          <span className="font-heading leading-none text-ink text-base sm:text-lg md:text-xl">
            La Galletería
            <span className="block text-retro-red">Animada</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 font-sans text-sm font-semibold text-ink md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-retro-red"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.a
            href="#votar"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full border-4 border-ink bg-retro-yellow px-4 py-2 font-heading text-sm text-ink shadow-retro transition-all hover:shadow-retro-lg active:translate-y-1 active:shadow-none sm:text-base whitespace-nowrap"
          >
            ¡Vota Ya!
          </motion.a>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border-4 border-ink bg-cream text-ink shadow-retro md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <motion.div
              animate={menuOpen ? 'open' : 'closed'}
              variants={{
                open: { rotate: 90 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t-4 border-ink bg-cream md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border-4 border-ink bg-retro-yellow/20 px-4 py-3 font-heading text-lg text-ink shadow-retro transition-all hover:-translate-y-0.5 hover:shadow-retro-lg active:translate-y-1 active:shadow-none"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
