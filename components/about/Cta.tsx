'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sprout } from 'lucide-react';

export const CTA = () => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div ref={ctaRef} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-[#eae4d2]/20 via-[#509e8e]/10 to-[#487052]/20 dark:from-[#0c0d0d]/40 dark:via-[#575846]/20 dark:to-[#0c0d0d]/40 border border-[#575846]/20"
      >
        <h2 className="text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-6">
          Connect With Us
        </h2>
        <p className="text-[#575846] dark:text-[#eae4d2]/80 text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
          The future of our planet is being written right now — and you have a part to play in the story. 
          Whether you're a student, educator, creator, or someone who cares, we want to hear from you. 
          Real change begins with conversations, collaborations, and communities like ours.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#487052] to-[#509e8e] hover:from-[#487052]/90 hover:to-[#509e8e]/90 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Let's Build Together
            <Sprout className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <p className="text-[#487052] dark:text-[#509e8e] font-semibold text-lg mt-6">
          #YouthforPlanet #CreativeClimateCampaigns
        </p>
      </motion.div>
    </div>
  );
};