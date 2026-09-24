"use client"

import React, { useRef } from "react"

import { cn } from "@/lib/utils"

import patternColumns from "./brand-pattern-data.json"

import { motion, useScroll, useSpring, useTransform } from "motion/react"

// Flatten all 40 paths from the 10 columns
const allPaths: string[] = patternColumns.flat()

function SvgModule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1080 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "h-24 sm:h-36 md:h-52 lg:h-64 xl:h-72 w-auto shrink-0",
        className
      )}
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
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"])
  const smoothX = useSpring(x, { stiffness: 90, damping: 25, restDelta: 0.001 })

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 sm:py-16 md:py-24 select-none"
    >
      {/* Ambient background glow in the SVG brand color */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-44 w-96 max-w-full rounded-full bg-[#315B8C]/15 blur-[100px] md:h-64 md:w-150 md:blur-[130px] dark:bg-[#315B8C]/25" />
      </div>

      {/* Full-width sliding SVG track (strictly clipped by overflow-hidden) */}
      <motion.div
        style={{ x: smoothX }}
        className="flex w-max items-center gap-0 will-change-transform"
      >
        <SvgModule />
        <SvgModule />
        <SvgModule />
        <SvgModule />
        <SvgModule />
      </motion.div>
    </section>
  )
}
