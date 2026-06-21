import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IceCreamCone, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { createParticipant } from '../lib/api'
import type { Flavor } from '../lib/flavors'

export function VoteModal({
  flavor,
  open,
  onClose,
  onSuccess,
}: {
  flavor: Flavor
  open: boolean
  onClose: () => void
  onSuccess: (name: string) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim()) {
      setError('Nombre y email son obligatorios')
      return
    }

    if (!email.includes('@')) {
      setError('Introduce un email válido')
      return
    }

    setLoading(true)
    try {
      const res = await createParticipant({
        name: name.trim(),
        email: email.trim(),
        code: crypto.randomUUID(),
        flavor_voted: flavor.id,
      })
      onSuccess(res.name)
      setName('')
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative w-full max-w-md rounded-3xl border-4 border-ink bg-cream p-6 shadow-retro-xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-full border-4 border-ink bg-retro-red text-cream shadow-retro"
            >
              <X className="size-5" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full border-4 border-ink bg-retro-red text-cream shadow-retro">
                <IceCreamCone className="size-6" />
              </span>
              <div>
                <h2 className="font-heading text-xl text-ink">¡Participa!</h2>
                <p className="font-sans text-xs font-medium text-ink/60">
                  Votando por <span className="font-bold text-retro-red">{flavor.name}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block font-heading text-xs text-ink sm:text-sm">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre o nick"
                  className="w-full rounded-2xl border-4 border-ink bg-white px-4 py-3 font-sans text-sm text-ink shadow-retro outline-none transition-shadow focus:shadow-retro-lg"
                />
              </div>

              <div>
                <label className="mb-1 block font-heading text-xs text-ink sm:text-sm">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border-4 border-ink bg-white px-4 py-3 font-sans text-sm text-ink shadow-retro outline-none transition-shadow focus:shadow-retro-lg"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl border-4 border-retro-red bg-retro-red/10 px-3 py-2 font-sans text-xs font-bold text-retro-red"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.95 }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border-4 border-ink bg-retro-red px-6 py-3 font-heading text-sm text-cream shadow-retro transition-all hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-1 active:shadow-none disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <CheckCircle className="size-5" />
                )}
                {loading ? 'Registrando...' : '¡Participar y Votar!'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
