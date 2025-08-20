'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface JourneyItem {
  year: string;
  title: string;
  description?: string;
}

interface JourneyTimelineProps {
  journey: JourneyItem[];
}

export const JourneyTimeline = ({ journey }: JourneyTimelineProps) => {
  const journeyRef = useRef(null);
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.2 });

  const defaultJourney = [
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

  const displayJourney = journey?.length ? journey : defaultJourney;

  return (
    <section ref={journeyRef} className="mb-20 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={journeyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10 sm:mb-16 text-center text-3xl sm:text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]"
      >
        Our Journey
      </motion.h2>

      {/* Timeline */}
      <div className="relative max-w-3xl sm:max-w-4xl mx-auto">
        {/* Vertical line (desktop only) */}
        <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#487052] to-[#509e8e] hidden md:block"></div>

        {displayJourney.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={journeyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
            className="relative mb-10 sm:mb-12 md:ml-14 lg:ml-16"
          >
            {/* Timeline dot (desktop only) */}
            <div className="absolute -left-6 sm:-left-8 top-6 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#487052] to-[#509e8e] ring-4 ring-[#eae4d2] dark:ring-[#0c0d0d]"></div>

            {/* Card */}
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 hover:bg-[#eae4d2]/20 dark:hover:bg-[#0c0d0d]/30 transition-colors duration-300">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#487052] to-[#509e8e] text-white font-semibold text-xs sm:text-sm">
                  {item.year}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-[#0c0d0d] dark:text-[#eae4d2]">
                  {item.title}
                </h3>
              </div>
              {item.description && (
                <p className="text-sm sm:text-base text-[#575846] dark:text-[#eae4d2]/70 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
