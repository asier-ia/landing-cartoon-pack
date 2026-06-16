"use client"

import { motion } from "framer-motion"
import { Camera, Cookie, Mail, MessageCircle, Music } from "lucide-react"
import { PopIn } from "@/components/pop-in"

const SOCIALS = [
  { label: "Instagram", icon: Camera },
  { label: "Mensajes", icon: MessageCircle },
  { label: "Música", icon: Music },
  { label: "Correo", icon: Mail },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink px-4 py-20 text-cream">
      {/* iris-out circle frame like a cartoon end screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 38%, var(--ink) 39%)",
        }}
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <PopIn>
          <span className="mb-6 inline-flex size-16 items-center justify-center rounded-full border-4 border-cream bg-retro-red text-cream">
            <Cookie className="size-8" />
          </span>
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
              whileHover={{ y: -4, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="flex size-12 items-center justify-center rounded-full border-4 border-cream bg-cream text-ink shadow-[4px_4px_0px_0px_var(--retro-red)]"
            >
              <Icon className="size-5" />
            </motion.a>
          ))}
        </div>

        <p className="mt-10 font-heading text-xs text-cream/60">
          La Galletería Animada © 1932 · Hecho con cariño
        </p>
      </div>
    </footer>
  )
}
