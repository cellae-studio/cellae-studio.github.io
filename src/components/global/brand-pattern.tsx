"use client"

import React, { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import patternColumns from "./brand-pattern-data.json"
import { cn } from "@/lib/utils"

// Flatten all 40 paths from the 10 columns
const allPaths: string[] = patternColumns.flat()

function SvgModule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1080 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-48 w-auto shrink-0 md:h-72 lg:h-96", className)}
    >
      {allPaths.map((d, i) => (
        <path key={i} d={d} fill="#315B8C" />
      ))}
    </svg>
  )
}

export function BrandPattern() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Horizontal translation driven by vertical scroll (slides to the left as you scroll down)
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-28%"])
  const smoothX = useSpring(x, { stiffness: 120, damping: 28 })

  return (
    <section
      ref={containerRef}
      className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen max-w-[100vw] overflow-hidden py-16 md:py-28 select-none"
    >
      {/* Ambient background glow in the SVG brand color */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-62.5 w-200 max-w-[95vw] rounded-full bg-[#315B8C]/15 blur-[120px] dark:bg-[#315B8C]/25" />
      </div>

      {/* Full-width sliding SVG track */}
      <motion.div
        style={{ x: smoothX }}
        className="flex w-max items-center gap-0 will-change-transform"
      >
        <SvgModule />
        <SvgModule />
        <SvgModule />
        <SvgModule />
      </motion.div>
    </section>
  )
}
