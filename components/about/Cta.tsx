'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sprout } from 'lucide-react';
import Link from "next/link";

export const CTA = () => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div ref={ctaRef} className="w-full max-w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#eae4d2]/20 via-[#509e8e]/10 to-[#487052]/20 dark:from-[#0c0d0d]/40 dark:via-[#575846]/20 dark:to-[#0c0d0d]/40 border border-[#575846]/20 text-center"
      >
        {/* Heading - Responsive text sizes */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-4 sm:mb-6">
          Connect With Us
        </h2>
        
        {/* Description - Different content for mobile vs desktop */}
        <div className="mb-6 sm:mb-8">
          {/* Mobile - Shorter text */}
          <p className="block sm:hidden text-[#575846] dark:text-[#eae4d2]/80 text-base leading-relaxed max-w-sm mx-auto">
            The future of our planet is being written right now — and you have a part to play in the story. 
            Ready to make real change together?
          </p>
          
          {/* Desktop - Full text */}
          <p className="hidden sm:block text-[#575846] dark:text-[#eae4d2]/80 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            The future of our planet is being written right now — and you have a part to play in the story. 
            Whether you're a student, educator, creator, or someone who cares, we want to hear from you.
            Real change begins with conversations, collaborations, and communities like ours.
          </p>
        </div>
        
        {/* Button */}
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
          <Button
            size="lg"
            onClick={() => window.open("https://docs.google.com/forms/d/1ZSRthPLYMao1a4z1e9aXsNaR-PFQOtZn0UJkOVvnyEo/viewform?edit_requested=true", "_blank")}
            className="w-full sm:w-auto bg-gradient-to-r from-[#487052] to-[#509e8e] hover:from-[#487052]/90 hover:to-[#509e8e]/90 text-white border-0 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs sm:max-w-none"
          >
            <span className="flex items-center justify-center gap-2">
              Let's Build Together
              <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </Button>
        </div>

        {/* Hashtags - Responsive text */}
        <p className="text-[#487052] dark:text-[#509e8e] font-semibold text-sm sm:text-base lg:text-lg">
          #YouthforPlanet #CreativeClimateCampaigns
        </p>
      </motion.div>
    </div>
  );
};