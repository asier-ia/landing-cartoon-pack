"use client"

import { motion } from "framer-motion"
import { Cookie } from "lucide-react"

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-cream/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-full border-4 border-ink bg-retro-red text-cream shadow-retro">
            <Cookie className="size-5" />
          </span>
          <span className="font-heading text-sm leading-none text-ink sm:text-base md:text-lg">
            La Galletería
            <span className="block text-retro-red">Animada</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 font-sans text-sm font-semibold text-ink md:flex">
          <a href="#duelo" className="transition-colors hover:text-retro-red">
            El Duelo
          </a>
          <a href="#votar" className="transition-colors hover:text-retro-red">
            Sabores
          </a>
          <a href="#resultados" className="transition-colors hover:text-retro-red">
            Resultados
          </a>
        </div>

        <motion.a
          href="#votar"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="rounded-full border-4 border-ink bg-retro-yellow px-4 py-2 font-heading text-xs text-ink shadow-retro transition-all hover:shadow-retro-lg active:translate-y-1 active:shadow-none sm:text-sm"
        >
          ¡Vota Ya!
        </motion.a>
      </nav>
    </header>
  )
}
