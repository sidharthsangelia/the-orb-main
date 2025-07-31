'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const JourneyTimeline = () => {
  const journeyRef = useRef(null);
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.2 });

  const journey = [
    {
      year: '2022',
      title: 'The Spark',
      description: 'Founded by climate-conscious youth who saw the gap between awareness and action in India.',
    },
    {
      year: '2023',
      title: 'Building Community',
      description: 'Launched our first series of visual stories and began building our youth community.',
    },
    {
      year: '2024',
      title: 'Scaling Impact',
      description: 'Reached 50,000+ young people across 25 cities with our sustainability content and guides.',
    },
    {
      year: '2025',
      title: 'Documentary Vision',
      description: 'Launching our documentary project to track and celebrate India\'s sustainability transformation.',
    },
  ];

  return (
    <div ref={journeyRef} className="mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-16 text-center text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]"
      >
        Our Journey
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#487052] to-[#509e8e] hidden md:block"></div>
        
        {journey.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={journeyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
            className="relative mb-12 md:ml-16"
          >
            <div className="absolute -left-20 top-6 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#487052] to-[#509e8e] ring-4 ring-[#eae4d2] dark:ring-[#0c0d0d]"></div>
            
            <div className="p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#487052] to-[#509e8e] text-white font-bold text-sm">
                  {item.year}
                </span>
                <h3 className="text-2xl font-bold text-[#0c0d0d] dark:text-[#eae4d2]">
                  {item.title}
                </h3>
              </div>
              <p className="text-[#575846] dark:text-[#eae4d2]/70 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};