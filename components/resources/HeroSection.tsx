"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0d0d]/80 to-[#1a1b1b]/80 backdrop-blur-md">
      {/* Glowing light effect and wobbling circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] bg-[#59e1b3]/20 rounded-full blur-3xl animate-pulse" />
        <motion.svg
          className="absolute opacity-10"
          width="400" // Adjusted width to match the glowing circle
          height="400" // Adjusted height to match the glowing circle
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: [1, 1.05, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <circle cx="200" cy="200" r="200" fill="#509e8e" />
        </motion.svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Hashtag Box below navbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <div className="inline-block px-6 py-2 bg-[#87a899]/20 backdrop-blur-sm rounded-full border border-[#87a899]/30 text-[#87a899] text-sm font-medium">
            #PlanetConsciousYouth
          </div>
        </motion.div>

        {/* Resources Hub Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#12ce8f] mb-6 text-center"
        >
          Resources Hub
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg sm:text-xl text-[#eae4d2]/70 max-w-2xl mx-auto leading-relaxed text-center"
        >
          Explore The Órb Resources Hub — your go-to library for sustainable living guides, eco-friendly tips, climate action tools, and youth-focused environmental resources. Learn simple ways to reduce your footprint, make greener choices, and inspire change in your community.
        </motion.p>
      </div>
    </section>
  );
}