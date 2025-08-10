"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0d0d] to-[#1a1b1b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#eae4d2] mb-6 text-center"
        >
          Explore Resources
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg sm:text-xl text-[#eae4d2]/70 max-w-2xl mx-auto text-center"
        >
          Discover guides, educational content, stories, and voices that inspire
          climate action.
        </motion.p>
      </div>

      {/* Decorative background shapes from original code */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-10"
          width="1440"
          height="600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="720" cy="300" r="300" fill="#487052" />
        </svg>
      </div>
    </section>
  );
}
