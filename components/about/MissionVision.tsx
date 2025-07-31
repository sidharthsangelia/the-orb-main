'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye } from 'lucide-react';

export const MissionVisionSection = () => {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });

  return (
    <div ref={missionRef} className="mb-24">
      <div className="grid gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="relative space-y-6 p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white shadow-lg">
            <Target className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
            Our Mission
          </h2>

          <p className="text-[#575846] dark:text-[#eae4d2]/80 text-lg leading-relaxed">
            To empower businesses and communities with innovative digital solutions that drive sustainable growth, 
            enhance user experiences, and create lasting environmental value in India's evolving green economy. 
            We connect climate awareness with tangible action through youth-driven initiatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="relative space-y-6 p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#509e8e] to-[#487052] text-white shadow-lg">
            <Eye className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
            Our Vision  
          </h2>

          <p className="text-[#575846] dark:text-[#eae4d2]/80 text-lg leading-relaxed">
            India is at a pivotal moment regarding its climate future. We envision a generation of empowered youth 
            leading India's green transformation, where sustainable living is essential, not a privilege. 
            We are the bridge between climate awareness and scalable action.
          </p>
        </motion.div>
      </div>
    </div>
  );
};