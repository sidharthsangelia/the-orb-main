'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sprout, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <div ref={heroRef} className="mx-auto mb-20 max-w-5xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-6 flex justify-center"
      >
        <Badge
          variant="outline"
          className="border-[#487052]/30 bg-[#487052]/10 text-[#487052] dark:text-[#eae4d2] dark:border-[#509e8e]/30 dark:bg-[#509e8e]/10 rounded-full px-6 py-2 text-sm font-medium"
        >
          <Sprout className="mr-2 h-4 w-4" />
          Planet Conscious Youth
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#0c0d0d] via-[#575846] to-[#487052] dark:from-[#eae4d2] dark:via-[#eae4d2]/90 dark:to-[#509e8e] bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
      >
        Building Bridges Between
        <span className="block bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent">
          Awareness & Action
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-[#575846] dark:text-[#eae4d2]/80 mt-6 text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed"
      >
        We are <strong className="text-[#487052] dark:text-[#509e8e]">The Órb</strong> - a dynamic media organization driven by youth, 
        dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-[#487052] to-[#509e8e] hover:from-[#487052]/90 hover:to-[#509e8e]/90 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Join Our Movement
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};