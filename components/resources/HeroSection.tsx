"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  count: number;
  description: string;
}

interface HeroSectionProps {
  categories: Category[];
  onCategoryClick: (id: string) => void;
}

export default function HeroSection({ categories, onCategoryClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0d0d]/90 to-[#1a1b1b]/90 backdrop-blur-md py-24">
      {/* Subtle, blurry background effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-30"></div>
        </div>
        <motion.svg
          className="absolute opacity-10"
          width="700"
          height="700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: [1, 1.02, 1],
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <circle cx="350" cy="350" r="350" fill="#509e8e" />
        </motion.svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Glass-like container for content */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 lg:p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Hashtag, Heading, Subheading */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-[#87a899]/20 bg-white text-black dark:text-[#87a899] flex items-center space-x-2"
                >
                  #PlanetConsciousYouth
                </HoverBorderGradient>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#ffffff] mb-0"
              >
                Resources
              </motion.p>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#ffffff] mb-6"
              >
                Hub
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="text-lg sm:text-xl text-[#eae4d2]/70 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              >
                Explore The Órb Resources Hub — your go-to library for sustainable living guides, eco-friendly tips, climate action tools, and youth-focused environmental resources. Learn simple ways to reduce your footprint, make greener choices, and inspire change in your community.
              </motion.p>
            </div>

            {/* Right Column: 2x2 Category Grid */}
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    translateY: -10,
                  }}
                  transition={{ delay: 0.1 * index + 0.6, duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center w-full h-48 sm:h-60 bg-card border border-border rounded-lg cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 p-6 aspect-square relative overflow-hidden"
                  onClick={() => onCategoryClick(category.id)}
                >
                  <div className="mb-3 z-10">{category.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground text-center z-10">{category.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center z-10">{category.count} items</p>
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    whileHover={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 bg-card/90 backdrop-blur-md flex items-center justify-center p-4 z-20 rounded-lg"
                  >
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4">{category.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => onCategoryClick(category.id)}
                      >
                        View →
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom animation for slower pulse
const animatePulseSlow = {
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.02)" },
  "100%": { transform: "scale(1)" },
};

// Custom animation for spin-slow
const animateSpinSlow = {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
};