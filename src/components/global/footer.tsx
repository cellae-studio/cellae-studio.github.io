"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { InstagramIcon, GithubIcon } from "../util/icons";

export function Footer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Keep bottom brand section hidden normally, reveal only when scrolled towards the bottom
  const scale = useTransform(smoothProgress, [0.35, 0.95], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0.35, 0.85], [0, 1]);
  const y = useTransform(smoothProgress, [0.35, 0.95], [100, 0]);

  return (
    <footer
      ref={containerRef}
      className="relative mt-24 w-full overflow-hidden border-t border-border/40 py-16 pb-24"
    >
      {/* Ambient background glow - reveals with brand section */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <div className="h-64 w-2xl rounded-full bg-primary/10 blur-[100px] dark:bg-primary/20" />
      </motion.div>

      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        {/* Top Bar: Copyright and Socials - visible normally */}
        <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-4 pb-12 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} cellae studio. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/cellae-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all duration-200 hover:text-foreground"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-auto" />
            </a>
            <a
              href="https://instagram.com/cellae.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all duration-200 hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-auto" />
            </a>
          </div>
        </div>

        {/* Animated Bottom Section (Brand Reveal) - hidden normally, reveals on scroll */}
        <motion.div
          style={{ scale, opacity, y }}
          className="mt-8 flex flex-col items-center gap-6 text-center select-none"
        >
          <motion.div
            initial={{ rotate: -8, scale: 0.9 }}
            whileInView={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
            className="relative"
          >
            <img
              src="/logo.svg"
              alt="cellae logo"
              className="size-20 drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)] md:size-28"
            />
            <div className="absolute -inset-2 -z-10 rounded-full bg-primary/20 blur-sm" />
          </motion.div>

          <motion.div
            initial={{ letterSpacing: "-0.05em", opacity: 0.8 }}
            whileInView={{ letterSpacing: "-0.15em", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: false }}
            className="flex items-center justify-center"
          >
            <span className="font-syncopate font-bold text-5xl text-primary md:text-7xl lg:text-8xl tracking-[-0.15em] select-none">
              cellae
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: false }}
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground md:text-sm"
          >
            Objects • Spaces • Identity
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
