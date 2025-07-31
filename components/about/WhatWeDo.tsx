'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Camera, BookOpen, FileText, Video, Users, Play } from 'lucide-react';

export const WhatWeDo = () => {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.3 });

  const services = [
    {
      title: 'Visual Climate Stories',
      description: 'Compelling visual narratives that explain, engage, and energize young minds about sustainability.',
      icon: <Camera className="h-6 w-6" />,
    },
    {
      title: 'Interactive Guides',
      description: 'DIY handbooks and practical guides to help youth live more consciously and sustainably.',
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: 'Youth-Led Journalism',
      description: 'Fresh, local perspectives on climate issues through authentic youth-driven reporting.',
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: 'Educational Content',
      description: 'Bite-sized explainers and deep-dive content that makes sustainability relatable and reachable.',
      icon: <Video className="h-6 w-6" />,
    },
    {
      title: 'Community Building',
      description: 'Creating spaces for climate-conscious youth to connect, collaborate, and create change together.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Documentary Projects',
      description: 'Coming soon - tracking India\'s sustainability evolution through powerful documentary storytelling.',
      icon: <Play className="h-6 w-6" />,
    },
  ];

  return (
    <div ref={servicesRef} className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-4">
          What We Do
        </h2>
        <p className="text-2xl font-semibold bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent mb-6">
          Inform, Inspire, Initiate
        </p>
        <p className="text-[#575846] dark:text-[#eae4d2]/70 text-lg max-w-4xl mx-auto leading-relaxed">
          Through engaging multimedia content, community-based education, and hands-on projects, 
          we inspire a generation to take charge of India's climate narrative. Every post, podcast, 
          or page is a step toward action.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 space-y-4 hover:bg-[#eae4d2]/20 dark:hover:bg-[#0c0d0d]/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#487052] to-[#509e8e] text-white group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#0c0d0d] dark:text-[#eae4d2]">
                {service.title}
              </h3>
            </div>
            <p className="text-[#575846] dark:text-[#eae4d2]/70 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};