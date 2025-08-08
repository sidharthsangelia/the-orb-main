"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PhoneMockup from "@/components/ui/phone-mockup";
import { useTheme } from "next-themes";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import Earth from "@/components/mvpblocks/Globe";
import Link from "next/link";

export default function LucyHero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const heroRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0, 0.5], [20, 0, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0, 0.5], [-20, 0, 20]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const GradientText = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span
      className={cn(
        "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );

  return (
    <>
    {/* Updated Background Effects - matching community hero */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-30"></div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(166_33%_47%_/_0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(166_33%_47%_/_0.1),rgba(180,3,5,0))]"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,hsl(139_21%_36%_/_0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_10%_90%,hsl(139_21%_36%_/_0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,hsl(166_33%_47%_/_0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_90%_20%,hsl(166_33%_47%_/_0.04),transparent_50%)]"></div>

        <div className="bg-noise absolute inset-0 opacity-[0.02]"></div>
        <div className="absolute inset-0 opacity-5 backdrop-blur-[100px]"></div>
        <div className="absolute inset-0 [background-image:linear-gradient(hsl(166_33%_47%_/_0.05)_1px,transparent_1px),linear-gradient(to_right,hsl(166_33%_47%_/_0.05)_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] dark:[background-image:linear-gradient(hsl(139_21%_36%_/_0.03)_1px,transparent_1px),linear-gradient(to_right,hsl(139_21%_36%_/_0.03)_1px,transparent_1px)] dark:opacity-[0.02]"></div>
      </motion.div>

        <div
          ref={heroRef}
          className="container relative  overflow-hidden py-16"
        >
      <motion.div
        className="relative z-10 container mx-auto max-w-7xl"
        style={{ y: contentY }}
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.7,
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate={controls}
            className="flex flex-col  text-center md:ml-20 md:text-left"
          >
            {/* Updated heading with gradient styling */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-foreground mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  The Órb:
                </span>{' '}
                Youth-Led Action for a Sustainable India
              </h2>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-foreground mb-8 text-lg leading-relaxed"
            >
              Empowering the next generation to bridge awareness and action in
              sustainability. We are the narrators, educators, and agents of
              change, believing that sustainable living is not a luxury, but a
              necessity for all.
            </motion.p>

            {/* Updated buttons matching community hero style */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-wrap justify-center gap-4 md:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link href="/posts" className="flex items-center gap-2">
                
                <Button className="relative group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105">
                  <span className="flex items-center gap-2">
                    Explore
                    <Sparkles className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="bg-background/50 absolute inset-0 -z-10 rounded-full backdrop-blur-sm"></div>
                <Link href="/about" className="flex items-center gap-2">
                
                <Button
                  variant="outline"
                  className="group px-8 py-4 border-2 border-primary/30 bg-background/50 rounded-full text-primary hover:text-primary backdrop-blur-sm font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                  <span className="flex items-center gap-2">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                  </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <Earth
            baseColor={[0.282, 0.439, 0.322]} // moss green
            markerColor={[0.314, 0.62, 0.557]} // teal
            glowColor={[0.918, 0.894, 0.824]} // cream
            theta={0.25}
            dark={1}
            diffuse={1.2}
            mapSamples={40000}
            mapBrightness={6}
          />
        </div>
      </motion.div>
    </div>
    </>
  );
}