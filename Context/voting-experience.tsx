"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Crown, Trophy } from "lucide-react"
import { FLAVORS, type Flavor } from "@/lib/flavors"
import { PopIn } from "@/components/pop-in"

export function VotingExperience() {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(FLAVORS.map((f) => [f.id, f.initialVotes])),
  )
  const [votedFor, setVotedFor] = useState<string | null>(null)

  function handleVote(id: string) {
    if (votedFor) return
    setVotedFor(id)
    setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }))
  }

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
            <p className="mt-3 font-sans text-base font-medium text-muted-foreground">
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
      />
    </>
  )
}

function FlavorCard({
  flavor,
  voted,
  votingClosed,
  onVote,
}: {
  flavor: Flavor
  voted: boolean
  votingClosed: boolean
  onVote: () => void
}) {
  return (
    <motion.article
      whileHover={{ y: -8, rotate: voted ? 0 : -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-4 border-ink shadow-retro-lg transition-shadow hover:shadow-retro-xl"
      style={{ backgroundColor: flavor.bg }}
    >
      {voted && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border-4 border-ink bg-cream px-3 py-1 font-heading text-xs text-ink shadow-retro">
          <Check className="size-4" /> ¡Votado!
        </div>
      )}

      <div className="relative aspect-square w-full border-b-4 border-ink">
        <Image
          src={flavor.image || "/placeholder.svg"}
          alt={`Personaje galleta ${flavor.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
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

        <button
          type="button"
          onClick={onVote}
          disabled={votingClosed}
          className="mt-5 w-full rounded-full border-4 border-ink bg-cream px-4 py-3 font-heading text-sm text-ink shadow-retro transition-all hover:-translate-y-1 hover:bg-retro-red hover:text-cream hover:shadow-retro-lg active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-cream disabled:hover:text-ink disabled:hover:shadow-retro"
        >
          {voted ? "¡Gracias por votar!" : "¡Votar por este!"}
        </button>
      </div>
    </motion.article>
  )
}

function ResultsBoard({
  votes,
  total,
  leaderId,
  hasVoted,
}: {
  votes: Record<string, number>
  total: number
  leaderId: string
  hasVoted: boolean
}) {
  return (
    <section id="resultados" className="border-b-4 border-ink bg-retro-blue/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <PopIn className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-4 border-ink bg-cream px-4 py-2 font-heading text-xs text-ink shadow-retro">
            <Trophy className="size-4 fill-retro-yellow" />
            Tablero de Resultados
          </span>
          <h2 className="mt-4 font-heading text-3xl text-ink sm:text-4xl md:text-5xl">
            ¿Quién va <span className="text-retro-red">ganando?</span>
          </h2>
          <p className="mt-3 font-sans text-base font-medium text-ink/70">
            {total.toLocaleString("es")} votos contados hasta ahora.
          </p>
        </PopIn>

        <div className="flex flex-col gap-6 rounded-3xl border-4 border-ink bg-cream p-5 shadow-retro-lg sm:p-8">
          {FLAVORS.map((flavor) => {
            const pct = total > 0 ? (votes[flavor.id] / total) * 100 : 0
            const isLeader = flavor.id === leaderId
            return (
              <div key={flavor.id}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-heading text-sm text-ink sm:text-base">
                    {isLeader && (
                      <Crown className="size-5 fill-retro-yellow text-ink" />
                    )}
                    {flavor.name}
                  </span>
                  <span className="font-heading text-sm text-retro-red sm:text-base">
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-8 w-full overflow-hidden rounded-full border-4 border-ink bg-cream">
                  <motion.div
                    className="flex h-full items-center justify-end rounded-full pr-2"
                    style={{ backgroundColor: flavor.bg }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  >
                    <span className="font-sans text-xs font-bold text-ink">
                      {votes[flavor.id].toLocaleString("es")}
                    </span>
                  </motion.div>
                </div>
              </div>
            )
          })}

          <AnimatePresence>
            {hasVoted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
