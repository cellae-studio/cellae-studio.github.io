"use client"
import { Hero } from "@/components/global/hero"
import { Button } from "@/components/ui/button"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"

import { motion } from "motion/react"

export default function Page() {
  return (
    <>
      {/* 
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text={"cellae"}
          words={["Objects", "Spaces", "Identity"]}
        />
      </motion.div>
      <div>
        <h1 className="font-medium">Project ready!</h1>
        <p>You may now add components and start building.</p>
        <p>We&apos;ve already added the button component for you.</p>
        <Button className="mt-2">Button</Button>
      </div>
      <div className="font-mono text-xs text-muted-foreground">
        (Press{" "}
        <kbd className="rounded border px-1.5 py-0.5 font-semibold">d</kbd> to
        toggle dark mode)
      </div> */}
      <Hero />
      <div className="min-h-[200vh]"></div>
    </>
  )
}
