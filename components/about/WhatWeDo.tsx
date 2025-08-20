'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Camera, BookOpen, FileText, Video, Users, Play, Leaf, Globe,
  Heart, Lightbulb, Target, Shield, Zap
} from 'lucide-react';

interface Activity {
  title: string;
  description: string;
  icon?: string;
}

interface WhatWeDoProps {
  activities: Activity[];
}

const iconMap: Record<string, any> = {
  Camera, BookOpen, FileText, Video, Users, Play, Leaf,
  Globe, Heart, Lightbulb, Target, Shield, Zap,
};

const getIconComponent = (iconName?: string) => {
  const IconComponent = iconMap[iconName ?? ''] || Camera;
  return <IconComponent className="h-6 w-6" />;
};

export const WhatWeDo = ({ activities }: WhatWeDoProps) => {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });

  const defaultActivities = [
    { title: 'Visual Climate Stories', description: 'Compelling visual narratives that explain, engage, and energize young minds about sustainability.', icon: 'Camera' },
    { title: 'Interactive Guides', description: 'DIY handbooks and practical guides to help youth live more consciously and sustainably.', icon: 'BookOpen' },
    { title: 'Youth-Led Journalism', description: 'Fresh, local perspectives on climate issues through authentic youth-driven reporting.', icon: 'FileText' },
    { title: 'Educational Content', description: 'Bite-sized explainers and deep-dive content that makes sustainability relatable and reachable.', icon: 'Video' },
    { title: 'Community Building', description: 'Creating spaces for climate-conscious youth to connect, collaborate, and create change together.', icon: 'Users' },
    { title: 'Documentary Projects', description: 'Coming soon - tracking India\'s sustainability evolution through powerful documentary storytelling.', icon: 'Play' },
  ];

  const displayActivities = activities?.length ? activities : defaultActivities;

  return (
    <section ref={servicesRef} className="mb-20 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={servicesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-3">
          What We Do
        </h2>
        <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent mb-5">
          Inform, Inspire, Initiate
        </p>
        <p className="text-[#575846] dark:text-[#eae4d2]/70 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Through engaging multimedia content, community-based education, and hands-on projects,
          we inspire a generation to take charge of India's climate narrative.
        </p>
      </motion.div>

      {/* Activities */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayActivities.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 
                       hover:bg-[#eae4d2]/20 dark:hover:bg-[#0c0d0d]/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg 
                              bg-gradient-to-br from-[#487052] to-[#509e8e] text-white 
                              group-hover:scale-105 transition-transform duration-300">
                {getIconComponent(service.icon)}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#0c0d0d] dark:text-[#eae4d2]">
                {service.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[#575846] dark:text-[#eae4d2]/70 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
