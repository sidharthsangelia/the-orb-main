'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye } from 'lucide-react';

interface MissionVisionSectionProps {
  mission?: string;
  vision?: string;
}

export const MissionVisionSection = ({ mission, vision }: MissionVisionSectionProps) => {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });

  const defaultMission = "To empower businesses and communities with innovative digital solutions that drive sustainable growth, enhance user experiences, and create lasting environmental value in India's evolving green economy. We connect climate awareness with tangible action through youth-driven initiatives.";
    
  const defaultVision = "India is at a pivotal moment regarding its climate future. We envision a generation of empowered youth leading India's green transformation, where sustainable living is essential, not a privilege. We are the bridge between climate awareness and scalable action.";

  const displayMission = mission || defaultMission;
  const displayVision = vision || defaultVision;

  return (
    <div ref={missionRef} className="w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-24">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="relative space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 w-full"
          >
            {/* Icon */}
            <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white shadow-lg">
              <Target className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
              Our Mission
            </h2>
            
            {/* Content */}
            <p className="text-[#575846] dark:text-[#eae4d2]/80 text-base sm:text-lg leading-relaxed">
              {displayMission}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="relative space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 w-full"
          >
            {/* Icon */}
            <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#509e8e] to-[#487052] text-white shadow-lg">
              <Eye className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
              Our Vision
            </h2>
            
            {/* Content */}
            <p className="text-[#575846] dark:text-[#eae4d2]/80 text-base sm:text-lg leading-relaxed">
              {displayVision}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};