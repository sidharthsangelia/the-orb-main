'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sprout, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  tagline?: string;
  introText?: string;
}

export const HeroSection = ({ title, tagline, introText }: HeroSectionProps) => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const displayTitle = title || "Building Bridges Between Awareness & Action";
  const displayTagline = tagline || "Building Bridges Between Awareness & Action";
  const displayIntroText = introText || "We are The Órb - a dynamic media organization driven by youth, dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.";

  // Split the title for styling - if it contains "Awareness & Action", split on that
  const titleParts = displayTitle.includes('Awareness & Action') 
    ? displayTitle.split('Awareness & Action')
    : [displayTitle];

  return (
    <div ref={heroRef} className="mx-auto mb-20 max-w-5xl text-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-30"></div>
      </div>
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
        {titleParts.length > 1 ? (
          <>
            {titleParts[0]}
            <span className="block bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent">
              Awareness & Action
            </span>
            {titleParts[1]}
          </>
        ) : (
          displayTitle
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-[#575846] dark:text-[#eae4d2]/80 mt-6 text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed"
      >
        {displayIntroText.includes('The Órb') ? (
          <>
            {displayIntroText.split('The Órb')[0]}
            <strong className="text-[#487052] dark:text-[#509e8e]">The Órb</strong>
            {displayIntroText.split('The Órb')[1]}
          </>
        ) : (
          displayIntroText
        )}
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