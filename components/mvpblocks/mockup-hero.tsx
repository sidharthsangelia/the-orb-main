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
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Effects */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-30"></div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(166_33%_47%_/_0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(166_33%_47%_/_0.1),rgba(180,3,5,0))]"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,hsl(139_21%_36%_/_0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_10%_90%,hsl(139_21%_36%_/_0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,hsl(166_33%_47%_/_0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_90%_20%,hsl(166_33%_47%_/_0.04),transparent_50%)]"></div>

        <div className="bg-noise absolute inset-0 opacity-[0.02]"></div>
        <div className="absolute inset-0 opacity-5 backdrop-blur-[100px]"></div>
        <div className="absolute inset-0 [background-image:linear-gradient(hsl(166_33%_47%_/_0.05)_1px,transparent_1px),linear-gradient(to_right,hsl(166_33%_47%_/_0.05)_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] dark:[background-image:linear-gradient(hsl(139_21%_36%_/_0.03)_1px,transparent_1px),linear-gradient(to_right,hsl(139_21%_36%_/_0.03)_1px,transparent_1px)] dark:opacity-[0.02]"></div>
      </motion.div>

      {/* Main Content */}
      <div ref={heroRef} className="relative z-10 w-full max-w-full">
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          style={{ y: contentY }}
        >
          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden pt-10 flex flex-col items-center text-center space-y-8">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate={controls}
              className="w-full max-w-lg"
            >
              {/* Heading */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="w-full"
              >
                <h2 className="text-foreground mb-6 text-4xl sm:text-3xl leading-tight font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Youth-Led
                  </span>{" "}
                  <span className="block">Action for a</span>{" "}
                  <span className="block">Sustainable India</span>
                </h2>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-foreground mb-8 text-sm sm:text-base leading-relaxed"
              >
                Empowering the next generation to bridge awareness and action in
                sustainability. We are the narrators, educators, and agents of
                change, believing that sustainable living is not a luxury, but a
                necessity for all.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex  gap-4 w-full max-w-sm mx-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full"
                >
                  <Link href="/posts" className="block w-full">
                    <Button className="w-full relative group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500">
                      <span className="flex items-center gap-2">
                        Explore Posts
                        <Sparkles className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full"
                >
                  <Link href="/about" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full group px-6 py-3 border-2 border-primary/30 bg-background/50 rounded-full text-primary hover:text-primary backdrop-blur-sm font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2 justify-center">
                        Learn More{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Earth Component for Mobile */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate={controls}
              className="flex justify-center w-full"
            >
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
            </motion.div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-12">
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
              className="flex flex-col text-left w-full max-w-full"
            >
              {/* Heading */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="w-full"
              >
                <h2 className="text-foreground mb-6 text-4xl xl:text-6xl leading-tight font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Youth-Led
                  </span>{" "}
                  <span className="block sm:inline">Movement for a</span>{" "}
                  <span className="block sm:inline">Sustainable India</span>
                </h2>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-foreground mb-8 text-lg leading-relaxed max-w-full"
              >
                Empowering the next generation to bridge awareness and action in
                sustainability. We are the narrators, educators, and agents of
                change, believing that sustainable living is not a luxury, but a
                necessity for all.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-row gap-4 w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link href="/posts">
                    <Button className="relative group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105">
                      <span className="flex items-center gap-2">
                        Explore Posts
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
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="group px-8 py-4 border-2 border-primary/30 bg-background/50 rounded-full text-primary hover:text-primary backdrop-blur-sm font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2 justify-center">
                        Learn More{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Earth Component for Desktop */}
            <div className="flex justify-center lg:justify-end w-full">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
