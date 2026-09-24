"use client"

import React, { forwardRef, useEffect, useRef, useState } from "react"

import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"

import { LampContainer } from "../ui/lamp"
import { SpinningText } from "../ui/spinning-text"

import { Boxes, Cpu, Globe, Layers, Lightbulb, Sparkles } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"

export function Hero() {
  const { scrollY } = useScroll()
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  // Scroll-based rotation with spring inertia
  const scrollRotate = useTransform(scrollY, [0, 1000], [0, 360])
  const smoothRotate = useSpring(scrollRotate, { stiffness: 140, damping: 24 })

  // Scale down smoothly as user scrolls down the page
  const scrollScale = useTransform(scrollY, [0, 400], [1, 0.72])
  const smoothScale = useSpring(scrollScale, { stiffness: 140, damping: 24 })

  // Detect when footer enters the viewport and hide SpinningText
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0.05,
      }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full">
      {/* Scroll-Reactive Spinning Badge (Fixed Bottom Right, hides at footer) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isFooterVisible ? 0 : 1,
          scale: isFooterVisible ? 0.5 : 1,
          pointerEvents: isFooterVisible ? "none" : "auto",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-40 flex select-none items-center justify-center md:bottom-8 md:right-8"
      >
        {/* Inner Rotating & Scaling Container */}
        <motion.div
          style={{ rotate: smoothRotate, scale: smoothScale }}
          className="relative flex size-44 items-center justify-center"
        >
          <SpinningText
            radius={8.8}
            duration={22}
            className="font-mono text-xl uppercase tracking-[0.16em] text-muted-foreground/85 transition-colors hover:text-foreground"
          >
            objects • spaces • lighting • identity • iot • digital •
          </SpinningText>
        </motion.div>
      </motion.div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-linear-to-b from-foreground via-foreground/90 to-foreground/60 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Designed for <br /> the everyday.
        </motion.h1>
      </LampContainer>

      <div className="relative -mt-40 z-20 px-4 pb-20">
        <AnimatedBeamDemo />
      </div>
    </div>
  )
}

const Node = forwardRef<
  HTMLDivElement,
  {
    icon: React.ReactNode
    label: string
    sublabel?: string
    className?: string
  }
>(({ icon, label, sublabel, className }, ref) => {
  return (
    <div className="group relative flex flex-col items-center">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-card/85 p-3.5 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_24px_-4px_rgba(79,96,246,0.35)] dark:bg-card/70",
          className
        )}
      >
        {icon}
      </div>
      <div className="mt-2.5 flex flex-col items-center">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-foreground/80 transition-colors group-hover:text-primary">
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] text-muted-foreground/70">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
})

Node.displayName = "Node"

const CenterHub = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div className="group relative flex flex-col items-center">
        {/* Pulsing Aura */}
        <div className="absolute -inset-3 -z-10 rounded-full bg-primary/20 blur-2xl transition-all duration-500 group-hover:bg-primary/35 dark:bg-primary/25" />

        <div
          ref={ref}
          className={cn(
            "z-10 flex size-20 items-center justify-center rounded-3xl border-2 border-primary/40 bg-card p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_0_35px_-5px_rgba(79,96,246,0.45)] dark:bg-card/90",
            className
          )}
        >
          <img
            src="/logo.svg"
            alt="cellae hub"
            className="size-11 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <span className="mt-3 font-syncopate text-xs font-bold tracking-tight text-primary">
          cellae
        </span>
      </div>
    )
  }
)

CenterHub.displayName = "CenterHub"

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null) // Objects
  const div2Ref = useRef<HTMLDivElement>(null) // Spaces
  const div3Ref = useRef<HTMLDivElement>(null) // Lighting
  const div4Ref = useRef<HTMLDivElement>(null) // Center Hub (cellae)
  const div5Ref = useRef<HTMLDivElement>(null) // Identity
  const div6Ref = useRef<HTMLDivElement>(null) // IoT
  const div7Ref = useRef<HTMLDivElement>(null) // Digital

  // Brand Palette: Accent Coral -> Primary Indigo
  const beamColors = {
    start: "#ff7b54", // Accent Coral
    stop: "#4f60f6", // Primary Indigo
    path: "rgba(120, 130, 150, 0.18)",
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Outer Card with subtle glassmorphism */}
      <div
        ref={containerRef}
        className="relative flex min-h-105 w-full flex-col items-center justify-between overflow-hidden  p-8  md:p-12"
      >
        {/* Subtle grid pattern background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(120,130,150,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,150,0.06)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />

        {/* Section Header Tag */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1 text-md font-medium text-muted-foreground backdrop-blur-md">
          <span>Ecosystem Convergence</span>
        </div>

        {/* Node Layout Grid */}
        <div className="flex w-full max-w-xl flex-1 flex-col items-stretch justify-between gap-10">
          {/* Row 1: Objects (Left) & Identity (Right) */}
          <div className="flex flex-row items-center justify-between">
            <Node
              ref={div1Ref}
              icon={
                <Boxes className="size-6 text-foreground/80 transition-colors group-hover:text-primary" />
              }
              label="Objects"
              sublabel="Industrial"
            />
            <Node
              ref={div5Ref}
              icon={
                <Sparkles className="size-6 text-foreground/80 transition-colors group-hover:text-primary" />
              }
              label="Identity"
              sublabel="Brand"
            />
          </div>

          {/* Row 2: Spaces (Left), Center Hub (cellae), IoT (Right) */}
          <div className="flex flex-row items-center justify-between">
            <Node
              ref={div2Ref}
              icon={
                <Layers className="size-6 text-foreground/80 transition-colors group-hover:text-primary" />
              }
              label="Spaces"
              sublabel="Spatial"
            />
            <CenterHub ref={div4Ref} />
            <Node
              ref={div6Ref}
              icon={
                <Cpu className="size-6 text-foreground/80 transition-colors group-hover:text-primary" />
              }
              label="Connected"
              sublabel="IoT"
            />
          </div>

          {/* Row 3: Lighting (Left) & Digital (Right) */}
          <div className="flex flex-row items-center justify-between">
            <Node
              ref={div3Ref}
              icon={
                <Lightbulb className="size-6 text-foreground/80 transition-colors group-hover:text-primary" />
              }
              label="Lighting"
              sublabel="Ambience"
            />
            <Node
              ref={div7Ref}
              icon={
                <Globe className="size-6 text-foreground/80 transition-colors group-hover:text-primary" />
              }
              label="Digital"
              sublabel="Systems"
            />
          </div>
        </div>

        {/* Left Side Inbound Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-65}
          endYOffset={-12}
          gradientStartColor={beamColors.start}
          gradientStopColor={beamColors.stop}
          pathColor={beamColors.path}
          duration={3.8}
          delay={0}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          gradientStartColor={beamColors.start}
          gradientStopColor={beamColors.stop}
          pathColor={beamColors.path}
          duration={3.8}
          delay={0.8}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={65}
          endYOffset={12}
          gradientStartColor={beamColors.start}
          gradientStopColor={beamColors.stop}
          pathColor={beamColors.path}
          duration={3.8}
          delay={1.6}
        />

        {/* Right Side Inbound Beams (Reverse) */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-65}
          endYOffset={-12}
          gradientStartColor={beamColors.start}
          gradientStopColor={beamColors.stop}
          pathColor={beamColors.path}
          duration={3.8}
          delay={0.4}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          gradientStartColor={beamColors.start}
          gradientStopColor={beamColors.stop}
          pathColor={beamColors.path}
          duration={3.8}
          delay={1.2}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={65}
          endYOffset={12}
          gradientStartColor={beamColors.start}
          gradientStopColor={beamColors.stop}
          pathColor={beamColors.path}
          duration={3.8}
          delay={2.0}
          reverse
        />
      </div>
    </div>
  )
}
