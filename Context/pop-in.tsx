"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function PopIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 14,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
