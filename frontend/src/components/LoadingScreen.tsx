import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IceCreamCone } from 'lucide-react'

export function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{
            scaleY: 0,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [0, 1.3, 1],
              rotate: [-180, 10, 0],
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              times: [0, 0.6, 1],
            }}
            className="flex size-20 items-center justify-center rounded-full border-4 border-cream bg-retro-red text-cream shadow-[6px_6px_0px_0px_rgba(253,246,227,0.3)]"
          >
            <IceCreamCone className="size-10" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-6 font-heading text-2xl text-cream"
          >
            La Heladería Animada
          </motion.p>

          <motion.div
            className="mt-4 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="size-3 rounded-full bg-retro-yellow"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
