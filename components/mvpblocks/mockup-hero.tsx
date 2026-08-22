"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * The globe is a WebGL canvas — there is nothing useful to render on the
 * server, and deferring it keeps it off the critical path. It also used to be
 * written out twice (once in a `lg:hidden` tree, once in a `hidden lg:grid`
 * one), so two WebGL contexts booted on every page load.
 */
const Earth = dynamic(() => import("@/components/mvpblocks/Globe"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="mx-auto aspect-square w-full max-w-[260px] animate-pulse rounded-full bg-gradient-to-br from-brand/20 to-brand-accent/20 sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px]"
    />
  ),
});

// Module-level so the identity is stable across renders.
const GLOBE_BASE_COLOR: [number, number, number] = [0.282, 0.439, 0.322]; // moss green
const GLOBE_MARKER_COLOR: [number, number, number] = [0.314, 0.62, 0.557]; // teal
const GLOBE_GLOW_COLOR: [number, number, number] = [0.918, 0.894, 0.824]; // cream

/*
 * The hero copy animates with CSS, not framer-motion variants. Motion
 * variants ship the markup at `opacity: 0` and only reveal it once React
 * hydrates — which blanked the LCP element (the headline) until JS ran.
 * `animate-in` from tailwindcss-animate paints on first frame instead.
 */
const reveal =
  "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both";

export default function LucyHero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-svh w-full items-center overflow-hidden pt-header"
      aria-labelledby="hero-heading"
    >
      {/*
       * Background. Trimmed from eight stacked layers to three that each do
       * something: a top-down brand wash, a corner bloom, and a fine grid.
       */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={prefersReducedMotion ? undefined : { y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-10%,hsl(var(--brand-accent)/0.18),transparent_70%)]" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,hsl(var(--brand)/0.14),transparent_65%)] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      </motion.div>

      <div className="container relative z-10 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            

            <h1
              id="hero-heading"
              className={cn(
                reveal,
                "mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground [animation-delay:100ms] sm:text-5xl lg:text-5xl xl:text-6xl"
              )}
            >
              <span className="text-gradient-brand">Youth-Led</span> Movement
              for a Sustainable India
            </h1>

            <p
              className={cn(
                reveal,
                "mb-9 max-w-xl text-base leading-relaxed text-muted-foreground [animation-delay:200ms] sm:text-lg"
              )}
            >
            Empowering the next generation to bridge awareness and action in sustainability. We are the narrators, educators, and agents of change, believing that sustainable living is not a luxury, but a necessity for all.
            </p>

            <div
              className={cn(
                reveal,
                "flex w-full flex-col gap-3 [animation-delay:300ms] sm:w-auto sm:flex-row sm:gap-4"
              )}
            >
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-gradient-to-r from-brand to-brand-accent px-7 text-base font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30"
              >
                <Link href="/posts">
                  Explore Posts
                  <ArrowRight
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group h-12 rounded-full border-2 border-brand/30 bg-background/60 px-7 text-base font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:bg-brand/5 hover:text-foreground"
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          </div>

          {/* Globe — one instance, shared by every breakpoint */}
          <div className="flex animate-in justify-center fade-in duration-1000 fill-mode-both [animation-delay:200ms] lg:justify-end">
            <Earth
              baseColor={GLOBE_BASE_COLOR}
              markerColor={GLOBE_MARKER_COLOR}
              glowColor={GLOBE_GLOW_COLOR}
              theta={0.25}
              dark={1}
              diffuse={1.2}
              mapSamples={40000}
              mapBrightness={6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
