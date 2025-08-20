"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, ArrowRight } from "lucide-react";

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
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-background pt-12 sm:pt-16 lg:pt-20"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 sm:left-20 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] lg:w-[800px] h-[500px] sm:h-[700px] lg:h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-25"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex mt-8 items-center gap-2 px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30"
            >
              <Sprout className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Planet Conscious Youth
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight flex gap-4 justify-center tracking-tight"
            >
              <span className="block bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent">
                Resources
              </span>
              <span className="block bg-gradient-to-r from-[#ffffff] to-[#e9e9e9] bg-clip-text text-transparent">
                Hub
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg lg:text-xl text-[#575846] dark:text-[#eae4d2]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              The Órb Resources Hub brings you sustainable living guides, eco-friendly tips, climate tools, and resources to empower youth-driven change.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/1ZSRthPLYMao1a4z1e9aXsNaR-PFQOtZn0UJkOVvnyEo/viewform?edit_requested=true",
                    "_blank"
                  )
                }
                className="group bg-gradient-to-r from-[#487052] to-[#509e8e] hover:from-[#487052]/90 hover:to-[#509e8e]/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Contribute Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Categories */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md sm:max-w-2xl mx-auto lg:mx-0">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      scale: 1.05,
                      translateY: -4,
                      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
                    }}
                    transition={{
                      delay: 0.1 * index + 0.4,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="flex flex-col items-center justify-center h-40 sm:h-48 lg:h-56 bg-card/50 border border-border/50 rounded-lg cursor-pointer hover:bg-[#487052]/10 hover:border-[#487052]/30 transition-all duration-300 p-4 sm:p-6 aspect-square relative overflow-hidden"
                    onClick={() => onCategoryClick(category.id)}
                  >
                    <div className="mb-2 sm:mb-3 z-10">{category.icon}</div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#0c0d0d] dark:text-[#eae4d2] text-center z-10">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#575846] dark:text-[#eae4d2]/80 text-center z-10">
                      {category.count} items
                    </p>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      whileHover={{ opacity: 1, y: 0, height: "auto" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 bg-card/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-20 rounded-lg"
                    >
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-[#575846] dark:text-[#eae4d2]/80 mb-3 sm:mb-4">
                          {category.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#487052] dark:text-[#509e8e] hover:text-[#487052] hover:bg-[#487052]/10 dark:hover:bg-[#509e8e]/10"
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
      </div>
    </section>
  );
}
