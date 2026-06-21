import { useEffect, useState, useCallback, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Users, Search, Clock, Trophy, RefreshCw, Sparkles, Crown, Loader2, AlertCircle, CheckCircle, PartyPopper } from 'lucide-react'
import { PopIn } from './PopIn'
import { fetchRecentParticipants, searchParticipant, fetchSweepstakesStatus, drawWinner } from '../lib/api'
import type { ParticipantPublic, SweepstakesStatus as SweepstakesStatusType } from '../lib/api'
import { FLAVORS } from '../lib/flavors'

const EGG_TIMER = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: `${60 + i * 12}%`,
  left: `${10 + i * 35}%`,
  delay: i * 0.5,
  size: 10 + i * 4,
}))

function Countdown({ deadline }: { deadline: string }) {
  const calc = useCallback(() => {
    const diff = new Date(deadline).getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    }
  }, [deadline])

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])

  if (time.expired) return null

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {[
        { label: 'Días', value: time.days },
        { label: 'Horas', value: time.hours },
        { label: 'Min', value: time.minutes },
        { label: 'Seg', value: time.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="flex size-14 items-center justify-center rounded-2xl border-4 border-ink bg-cream font-heading text-2xl text-ink shadow-retro sm:size-16 sm:text-3xl">
            {String(value).padStart(2, '0')}
          </span>
          <span className="mt-1 font-sans text-[10px] font-bold uppercase text-ink/60 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function ParticipantBubble({
  p,
  index,
}: {
  p: ParticipantPublic
  index: number
}) {
  const flavor = FLAVORS.find((f) => f.id === p.flavor_voted)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 16 }}
      className="group flex items-center gap-3 rounded-2xl border-4 border-ink bg-white px-4 py-2.5 shadow-retro transition-all hover:-translate-y-0.5 hover:shadow-retro-lg"
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-ink font-heading text-xs text-ink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        style={{ backgroundColor: flavor?.bg ?? '#ccc' }}
      >
        {p.name.charAt(0).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1 truncate font-heading text-sm text-ink">
        {p.name}
      </span>
      <span className="shrink-0 rounded-full border-2 border-ink bg-cream px-2 py-0.5 font-sans text-[10px] font-bold uppercase text-ink/60">
        {flavor?.name ?? p.flavor_voted}
      </span>
    </motion.div>
  )
}

export function SweepstakesSection() {
  const [status, setStatus] = useState<SweepstakesStatusType | null>(null)
  const [participants, setParticipants] = useState<ParticipantPublic[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchResult, setSearchResult] = useState<{ exists: boolean; name?: string; flavor?: string } | null>(null)
  const [searching, setSearching] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [drawError, setDrawError] = useState<string | null>(null)
  const [winner, setWinner] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    const [s, p] = await Promise.all([
      fetchSweepstakesStatus().catch(() => null),
      fetchRecentParticipants().catch(() => [] as ParticipantPublic[]),
    ])
    if (s) setStatus(s)
    setParticipants(p)
    if (s?.winner_name) setWinner(s.winner_name)
  }, [])

  useEffect(() => {
    loadData()
    const id = setInterval(loadData, 15000)
    return () => clearInterval(id)
  }, [loadData])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    if (!searchName.trim()) return
    setSearching(true)
    setSearchResult(null)
    try {
      const res = await searchParticipant(searchName.trim())
      setSearchResult({
        exists: res.exists,
        name: res.name ?? undefined,
        flavor: res.flavor_voted ?? undefined,
      })
    } catch {
      setSearchResult({ exists: false })
    } finally {
      setSearching(false)
    }
  }

  const handleDraw = async () => {
    setDrawing(true)
    setDrawError(null)
    try {
      const res = await drawWinner()
      setWinner(res.winner_name)
      setStatus((prev) => prev ? { ...prev, has_winner: true, winner_name: res.winner_name } : prev)
    } catch (err) {
      setDrawError(err instanceof Error ? err.message : 'Error al sortear')
    } finally {
      setDrawing(false)
    }
  }

  const deadlinePassed = status?.deadline ? new Date(status.deadline).getTime() < Date.now() : false

  return (
    <section id="sorteo" className="relative overflow-hidden border-b-4 border-ink bg-retro-sky/20 px-4 py-16 md:py-24">
      {/* Decorative sparkles */}
      {EGG_TIMER.map((s) => (
        <motion.div
          key={s.id}
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{ top: s.top, left: s.left }}
          animate={{ y: [0, -8, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5 + s.delay, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          <Sparkles size={s.size} className="text-retro-yellow" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-3xl">
        <PopIn className="mb-10 text-center">
          <motion.span
            whileHover={{ rotate: [0, -6, 6, -6, 0] }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-4 border-ink bg-retro-yellow px-5 py-2 font-heading text-sm text-ink shadow-retro"
          >
            <Gift className="size-4" />
            Sorteo de Tortillas
          </motion.span>
          <h2 className="mt-4 font-heading text-3xl text-ink sm:text-4xl md:text-5xl">
            Participa y <span className="text-retro-red">llévate el premio</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty font-sans text-base font-medium text-ink/70">
            Cada voto cuenta como una participación. Mientras más votas, más
            oportunidades de ganar.
          </p>
        </PopIn>

        {/* Countdown */}
        <PopIn className="mb-8 rounded-3xl border-4 border-ink bg-cream p-6 shadow-retro-lg sm:p-8">
          <div className="mb-4 flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Clock className="size-6 text-retro-red" />
            </motion.span>
            <h3 className="font-heading text-xl text-ink">Tiempo restante</h3>
          </div>
          {status?.deadline ? (
            <Countdown deadline={status.deadline} />
          ) : (
            <p className="text-center font-sans text-sm text-ink/50">Esperando primeros participantes...</p>
          )}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-retro-yellow/30 px-3 py-1 font-sans text-xs font-bold text-ink/70">
              <Users className="size-3.5" />
              {status?.total_participants ?? 0} participaciones
            </span>
          </div>
        </PopIn>

        {/* Two columns */}
        <div className="grid gap-6 md:grid-cols-5">
          {/* Left: Search + Participants */}
          <div className="flex flex-col gap-6 md:col-span-3">
            {/* Search */}
            <PopIn delay={0.1} className="rounded-3xl border-4 border-ink bg-cream p-5 shadow-retro-lg sm:p-6">
              <div className="flex items-center gap-2">
                <Search className="size-5 text-retro-red" />
                <h3 className="font-heading text-lg text-ink">¿Ya participaste?</h3>
              </div>
              <form onSubmit={handleSearch} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Busca tu nombre..."
                  className="min-w-0 flex-1 rounded-2xl border-4 border-ink bg-white px-4 py-2.5 font-heading text-sm text-ink shadow-retro outline-none transition-shadow focus:shadow-retro-lg"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  disabled={searching}
                  className="shrink-0 rounded-full border-4 border-ink bg-retro-red px-5 py-2.5 font-heading text-xs text-cream shadow-retro transition-all hover:-translate-y-0.5 hover:shadow-retro-lg active:translate-y-1 active:shadow-none"
                >
                  {searching ? <Loader2 className="size-4 animate-spin" /> : 'Buscar'}
                </motion.button>
              </form>

              <AnimatePresence>
                {searchResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-3 flex items-center gap-2 rounded-2xl border-4 px-4 py-2.5 font-sans text-xs font-bold ${
                      searchResult.exists
                        ? 'border-retro-mint bg-retro-mint/15 text-ink'
                        : 'border-retro-red bg-retro-red/10 text-retro-red'
                    }`}
                  >
                    {searchResult.exists ? (
                      <>
                        <CheckCircle className="size-4 shrink-0" />
                        <span>
                          ¡<span className="font-heading">{searchResult.name}</span> ya está dentro!{' '}
                          <span className="underline decoration-2 underline-offset-2">
                            Votó por {FLAVORS.find((f) => f.id === searchResult.flavor)?.name ?? searchResult.flavor}
                          </span>
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="size-4 shrink-0" />
                        No estás en la lista… ¡vota para participar!
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </PopIn>

            {/* Participants */}
            <PopIn delay={0.2} className="flex flex-col gap-4 rounded-3xl border-4 border-ink bg-cream p-5 shadow-retro-lg sm:p-6">
              <div className="flex items-center gap-2">
                <Users className="size-5 text-retro-red" />
                <h3 className="font-heading text-lg text-ink">Participantes recientes</h3>
              </div>
              <div className="flex flex-col gap-2">
                {participants.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 rounded-2xl border-4 border-dashed border-ink/30 py-6 text-center"
                  >
                    <PartyPopper className="size-8 text-ink/20" />
                    <p className="font-heading text-sm text-ink/40">Sé el primero en participar</p>
                    <p className="font-sans text-xs text-ink/30">Elige tu tortilla favorita y vota</p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {participants.map((p, i) => (
                      <ParticipantBubble key={p.id} p={p} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </PopIn>
          </div>

          {/* Right: Winner / Draw */}
          <div className="md:col-span-2">
            <PopIn delay={0.3} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border-4 border-ink bg-cream p-5 shadow-retro-lg sm:p-6">
                {winner ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -24 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, -8, 8, -8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-flex size-20 items-center justify-center rounded-full border-4 border-ink bg-retro-yellow text-ink shadow-retro-xl"
                      >
                        <Crown className="size-10 fill-ink" />
                      </motion.span>
                    </motion.div>
                    <h3 className="mt-4 font-heading text-xl text-ink">¡Tenemos ganador!</h3>
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.3 }}
                      className="mt-2 font-heading text-3xl text-retro-red"
                    >
                      {winner}
                    </motion.p>
                    <div className="mt-2 flex items-center gap-1 font-sans text-xs font-medium text-ink/50">
                      <PartyPopper className="size-3.5" />
                      Será contactado por email
                      <PartyPopper className="size-3.5" />
                    </div>
                  </div>
                ) : deadlinePassed ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      className="inline-flex size-16 items-center justify-center rounded-full border-4 border-ink bg-retro-yellow text-ink shadow-retro-xl"
                    >
                      <Sparkles className="size-8" />
                    </motion.span>
                    <h3 className="mt-4 font-heading text-xl text-ink">¡El plazo terminó!</h3>
                    <p className="mt-1 font-sans text-xs font-medium text-ink/50">
                      Es hora de descubrir al ganador
                    </p>
                    <motion.button
                      type="button"
                      onClick={handleDraw}
                      disabled={drawing}
                      whileTap={{ scale: 0.95 }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border-4 border-ink bg-retro-red px-6 py-3 font-heading text-sm text-cream shadow-retro transition-all hover:-translate-y-1 hover:shadow-retro-xl active:translate-y-1 active:shadow-none disabled:opacity-60"
                    >
                      {drawing ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        <RefreshCw className="size-5" />
                      )}
                      {drawing ? 'Sorteando...' : 'Sortear Ganador'}
                    </motion.button>
                    {drawError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 font-sans text-xs font-bold text-retro-red"
                      >
                        {drawError}
                      </motion.p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <motion.span
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex size-16 items-center justify-center rounded-full border-4 border-ink bg-retro-yellow/40 text-ink shadow-retro"
                    >
                      <Trophy className="size-8" />
                    </motion.span>
                    <h3 className="mt-4 font-heading text-xl text-ink">¿Quién ganará?</h3>
                    <p className="mt-1 font-sans text-xs font-medium text-ink/50">
                      El ganador aparecerá aquí al terminar el plazo
                    </p>
                  </div>
                )}
              </div>
            </PopIn>
          </div>
        </div>
      </div>
    </section>
  )
}
