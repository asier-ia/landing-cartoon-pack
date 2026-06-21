import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Crown, Trophy, Sparkles, Gift } from 'lucide-react'
import { FLAVORS, type Flavor } from '../lib/flavors'
import { PopIn } from './PopIn'

function ConfettiBurst({ origin }: { origin: 'card' | 'board' }) {
  const COLORS = ['#F4C542', '#D94352', '#5B9BD5', '#7EC8A4', '#F4A2B3', '#B088C8']
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 300,
    y: -(Math.random() * 250 + 50),
    rotate: Math.random() * 720 - 360,
    size: 6 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: Math.random() > 0.5 ? 'rounded-full' : 'rotate-45',
  }))

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        origin === 'board' ? '' : ''
      }`}
      style={{ zIndex: 20 }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.shape}`}
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            border: '2px solid #1A1A1A',
          }}
          initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: 0,
            rotate: p.rotate,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export function VotingSection() {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(FLAVORS.map((f) => [f.id, f.initialVotes])),
  )
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleVote = useCallback(
    (id: string) => {
      if (votedFor) return
      setVotedFor(id)
      setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }))
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1200)
    },
    [votedFor],
  )

  const total = useMemo(
    () => Object.values(votes).reduce((a, b) => a + b, 0),
    [votes],
  )

  const leaderId = useMemo(
    () =>
      Object.entries(votes).reduce(
        (lead, [id, v]) => (v > votes[lead] ? id : lead),
        FLAVORS[0].id,
      ),
    [votes],
  )

  return (
    <>
      <section id="votar" className="border-b-4 border-ink px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <PopIn className="mb-12 text-center">
            <h2 className="font-heading text-3xl text-ink sm:text-4xl md:text-5xl">
              Elige a tu <span className="text-retro-red">Campeona</span>
            </h2>
            <p className="mt-3 font-sans text-base font-medium text-ink/70">
               Toca el botón de tu galleta favorita. ¡Solo tienes un voto, así
              que elige con sabiduría!
            </p>
          </PopIn>

          <div className="grid gap-8 md:grid-cols-3">
            {FLAVORS.map((flavor, i) => (
              <PopIn key={flavor.id} delay={i * 0.12}>
                <FlavorCard
                  flavor={flavor}
                  voted={votedFor === flavor.id}
                  votingClosed={votedFor !== null}
                  onVote={() => handleVote(flavor.id)}
                  isLeader={!votedFor ? false : flavor.id === leaderId}
                  showConfetti={showConfetti && votedFor === flavor.id}
                />
              </PopIn>
            ))}
          </div>
        </div>
      </section>

      <ResultsBoard
        votes={votes}
        total={total}
        leaderId={leaderId}
        hasVoted={votedFor !== null}
        showConfetti={showConfetti}
      />
    </>
  )
}

function FlavorCard({
  flavor,
  voted,
  votingClosed,
  onVote,
  isLeader,
  showConfetti,
}: {
  flavor: Flavor
  voted: boolean
  votingClosed: boolean
  onVote: () => void
  isLeader: boolean
  showConfetti: boolean
}) {
  return (
    <motion.article
      whileHover={
        voted
          ? {}
          : {
              y: -10,
              rotate: -1,
              scaleX: 1.02,
              scaleY: 0.98,
            }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-4 transition-shadow ${
        isLeader
          ? 'border-retro-yellow shadow-[0_0_0_4px_#F4C542,8px_8px_0px_0px_#1A1A1A]'
          : 'border-ink shadow-retro-lg hover:shadow-retro-xl'
      }`}
      style={{ backgroundColor: flavor.bg }}
    >
      {isLeader && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -left-1 -top-1 z-20"
        >
          <motion.span
            animate={{ rotate: [0, -6, 6, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex size-10 items-center justify-center"
          >
            <Crown className="size-8 fill-retro-yellow text-ink drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]" />
          </motion.span>
        </motion.div>
      )}

      {voted && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border-4 border-ink bg-cream px-3 py-1 font-heading text-xs text-ink shadow-retro">
          <Check className="size-4" /> ¡Votado!
        </div>
      )}

      {showConfetti && <ConfettiBurst origin="card" />}

      <div className="relative aspect-square w-full border-b-4 border-ink overflow-hidden">
        <img
          src={flavor.image}
          alt={`Personaje galleta ${flavor.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 text-ink">
        <h3 className="font-heading text-2xl">{flavor.name}</h3>
        <p className="mt-1 font-sans text-sm font-bold uppercase tracking-wide text-ink/70">
          {flavor.tagline}
        </p>
        <p className="mt-3 flex-1 font-sans text-sm font-medium leading-relaxed text-ink/90">
          {flavor.description}
        </p>

        <motion.button
          type="button"
          onClick={onVote}
          disabled={votingClosed}
          whileTap={votingClosed ? {} : { scale: 0.95 }}
          className="wobble mt-5 w-full rounded-full border-4 border-ink bg-cream px-4 py-3 font-heading text-sm text-ink shadow-retro transition-all hover:-translate-y-1 hover:bg-retro-red hover:text-cream hover:shadow-retro-lg active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-cream disabled:hover:text-ink disabled:hover:shadow-retro"
        >
          {voted ? '¡Gracias por votar!' : '¡Votar por este!'}
        </motion.button>
      </div>
    </motion.article>
  )
}

function ResultsBoard({
  votes,
  total,
  leaderId,
  hasVoted,
  showConfetti,
}: {
  votes: Record<string, number>
  total: number
  leaderId: string
  hasVoted: boolean
  showConfetti: boolean
}) {
  return (
    <section id="resultados" className="border-b-4 border-ink bg-retro-blue/30 px-4 py-16 md:py-24 relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <ConfettiBurst origin="board" />
        </div>
      )}
      <div className="mx-auto max-w-3xl relative z-10">
        <PopIn className="mb-10 text-center">
          <motion.span
            whileHover={{ rotate: [0, -6, 6, -6, 0] }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-4 border-ink bg-cream px-4 py-2 font-heading text-xs text-ink shadow-retro"
          >
            <Trophy className="size-4 fill-retro-yellow" />
            Tablero de Resultados
          </motion.span>
          <h2 className="mt-4 font-heading text-3xl text-ink sm:text-4xl md:text-5xl">
            ¿Quién va <span className="text-retro-red">ganando?</span>
          </h2>
          <p className="mt-3 font-sans text-base font-medium text-ink/70">
            {total.toLocaleString('es')} votos contados hasta ahora.
          </p>
        </PopIn>

        <div className="flex flex-col gap-6 rounded-3xl border-4 border-ink bg-cream p-5 shadow-retro-lg sm:p-8">
          {FLAVORS.map((flavor) => {
            const pct = total > 0 ? (votes[flavor.id] / total) * 100 : 0
            const isLeader = flavor.id === leaderId
            return (
              <motion.div
                key={flavor.id}
                animate={
                  isLeader && hasVoted
                    ? { scale: [1, 1.02, 1] }
                    : {}
                }
                transition={{ duration: 1.5, repeat: hasVoted ? Infinity : 0, ease: 'easeInOut' }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-heading text-sm text-ink sm:text-base">
                    {isLeader && (
                      <motion.span
                        animate={{ rotate: [0, -8, 8, -8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Crown className="size-5 fill-retro-yellow text-ink" />
                      </motion.span>
                    )}
                    {flavor.name}
                    {isLeader && (
                      <Sparkles className="size-4 text-retro-yellow" />
                    )}
                  </span>
                  <span className="font-heading text-sm text-retro-red sm:text-base">
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div
                  className={`h-8 w-full overflow-hidden rounded-full border-4 border-ink bg-cream ${
                    isLeader && hasVoted ? 'border-retro-yellow' : 'border-ink'
                  }`}
                >
                  <motion.div
                    className="flex h-full items-center justify-end rounded-full pr-2"
                    style={{ backgroundColor: flavor.bg }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                  >
                    <motion.span
                      className="font-sans text-xs font-bold text-ink"
                      animate={
                        isLeader && hasVoted
                          ? { scale: [1, 1.15, 1] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: hasVoted ? Infinity : 0, ease: 'easeInOut' }}
                    >
                      {votes[flavor.id].toLocaleString('es')}
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}

          <AnimatePresence>
            {hasVoted && (
              <motion.p
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                className="rounded-2xl border-4 border-ink bg-retro-mint px-4 py-3 text-center font-heading text-xs text-ink sm:text-sm"
              >
                ¡Tu voto ya cuenta! Comparte con tus amigos para que tu sabor gane.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
