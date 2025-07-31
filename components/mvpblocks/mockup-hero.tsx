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
import { ArrowRight, Sparkles } from "lucide-react";
import Earth from "@/components/mvpblocks/Globe";

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
        "from-primary dark:from-primary bg-gradient-to-r via-rose-400 to-rose-300 bg-clip-text text-transparent dark:via-rose-300 dark:to-red-400",
        className
      )}
    >
      {children}
    </span>
  );

  return (
    <div
      ref={heroRef}
      className="container   relative min-h-screen w-full overflow-hidden py-16"
    >
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(166_33%_47%_/_0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(166_33%_47%_/_0.1),rgba(180,3,5,0))]"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,hsl(139_21%_36%_/_0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_10%_90%,hsl(139_21%_36%_/_0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,hsl(166_33%_47%_/_0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_90%_20%,hsl(166_33%_47%_/_0.04),transparent_50%)]"></div>

        <div className="bg-noise absolute inset-0 opacity-[0.02]"></div>
        <div className="absolute inset-0 opacity-5 backdrop-blur-[100px]"></div>
        <div className="absolute inset-0 [background-image:linear-gradient(hsl(166_33%_47%_/_0.05)_1px,transparent_1px),linear-gradient(to_right,hsl(166_33%_47%_/_0.05)_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] dark:[background-image:linear-gradient(hsl(139_21%_36%_/_0.03)_1px,transparent_1px),linear-gradient(to_right,hsl(139_21%_36%_/_0.03)_1px,transparent_1px)] dark:opacity-[0.02]"></div>
      </motion.div>

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl"
        style={{ y: contentY }}
      >
        <div className="grid items-center  gap-12 md:grid-cols-2">
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
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-foreground mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
                {/* LU-cy bridges <GradientText>Web3</GradientText> and{' '}
                <GradientText>AI</GradientText> platforms for dev teams */}
                The Órb: Youth-Led Action for a Sustainable India
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
              necessity for all.{" "}
              {/* <span className="text-foreground font-semibold">
                Endless potential.
              </span> */}
            </motion.p>

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
                <Button className="relative rounded-full">
                  Explore
                  <Sparkles className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="bg-background/50 absolute inset-0 -z-10 rounded-full backdrop-blur-sm"></div>
                <Button
                  variant="outline"
                  className="border-primary/20 hover:border-primary/30 hover:bg-primary/5 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start"
            >
              {["Web3 Ready", "AI Powered", "Developer First"].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-foreground relative rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
                  >
                    <div className="border-primary/10 bg-background/80 dark:bg-background/30 absolute inset-0 rounded-full border backdrop-blur-md dark:border-white/5"></div>
                    <div className="via-primary/20 dark:via-primary/30 absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500/0 to-rose-500/0 dark:from-blue-500/0 dark:to-indigo-500/0"></div>

                    <span className="relative z-10">{feature}</span>
                  </motion.div>
                )
              )}
            </motion.div> */}
          </motion.div>

          {/* <Earth
            baseColor={isDark ? [0.18, 0.22, 0.18] : [0.282, 0.439, 0.322]} // darker moss green for dark mode
            markerColor={[0.314, 0.62, 0.557]} // teal (same for both modes)
            glowColor={isDark ? [0.314, 0.62, 0.557] : [0.918, 0.894, 0.824]} // teal glow for dark, cream for light
            theta={0.25}
            dark={isDark ? 0.3 : 1} // less darkness in dark mode for better visibility
            diffuse={isDark ? 1.8 : 1.2} // more diffusion in dark mode
            mapSamples={40000}
            mapBrightness={isDark ? 8 : 6} // brighter in dark mode
          /> */}
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

          {/* <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                },
              },
            }}
            initial="hidden"
            animate={controls}
            ref={mockupRef}
            className="relative mx-auto flex bg-violet-600 justify-center"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          
          >

                <Earth
            baseColor={isDark ? [0.18, 0.22, 0.18] : [0.282, 0.439, 0.322]} // darker moss green for dark mode
            markerColor={[0.314, 0.62, 0.557]} // teal (same for both modes)
            glowColor={isDark ? [0.314, 0.62, 0.557] : [0.918, 0.894, 0.824]} // teal glow for dark, cream for light
            theta={0.25}
            dark={isDark ? 0.3 : 1} // less darkness in dark mode for better visibility
            diffuse={isDark ? 1.8 : 1.2} // more diffusion in dark mode
            mapSamples={40000}
            mapBrightness={isDark ? 8 : 6} // brighter in dark mode
          />
            <motion.div
              className="relative z-10"
              style={{
                transformStyle: 'preserve-3d',
                rotateX: rotateX,
                rotateY: rotateY,
                scale: isHovered ? 1.05 : 1,
                transition: 'scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <PhoneMockup
                imageUrl={
                  isDark
                    ? 'https://blocks.mvp-subha.me/mobile-dark.webp'
                    : 'https://blocks.mvp-subha.me/mobile-light.webp'
                }
                alt="LU-cy mobile app"
                glowColor={
                  isDark ? 'rgba(229, 62, 62, 0.5)' : 'rgba(229, 62, 62, 0.25)'
                }
                className="max-w-[380px]"
              />
            </motion.div>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
}
