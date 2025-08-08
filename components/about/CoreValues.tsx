'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Users, Heart, Lightbulb, Target, Globe, Shield, Zap, Camera, BookOpen, FileText } from 'lucide-react';

interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

interface CoreValuesSectionProps {
  coreValues: CoreValue[];
}

// Icon mapping for Lucide React icons
const iconMap: Record<string, any> = {
  Leaf,
  Users,
  Heart,
  Lightbulb,
  Target,
  Globe,
  Shield,
  Zap,
  Camera,
  BookOpen,
  FileText,
  // Add more icons as needed
};

const getIconComponent = (iconName: string) => {
  const IconComponent = iconMap[iconName];
  if (IconComponent) {
    return <IconComponent className="h-6 w-6" />;
  }
  // Fallback to Leaf icon if icon name not found
  return <Leaf className="h-6 w-6" />;
};

export const CoreValuesSection = ({ coreValues }: CoreValuesSectionProps) => {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  // Default values if none provided
  const defaultCoreValues = [
    {
      title: 'Planet First',
      description: 'Every decision we make prioritizes environmental impact and sustainability for future generations.',
      icon: 'Leaf',
    },
    {
      title: 'Youth Empowerment',
      description: 'We believe young voices are the catalyst for meaningful climate action and systemic change.',
      icon: 'Users',
    },
    {
      title: 'Authentic Storytelling',
      description: 'We share real stories from the ground to humanize climate issues and inspire genuine action.',
      icon: 'Heart',
    },
    {
      title: 'Knowledge for Action',
      description: 'We transform complex climate science into accessible, actionable knowledge for everyday implementation.',
      icon: 'Lightbulb',
    },
  ];

  const displayValues = coreValues && coreValues.length > 0 ? coreValues : defaultCoreValues;

  return (
    <div ref={valuesRef} className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-4">
          Our Core Values
        </h2>
        <p className="text-[#575846] dark:text-[#eae4d2]/70 text-xl max-w-3xl mx-auto">
          The principles that guide every story we tell, every community we build, and every action we inspire.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {displayValues.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="text-center space-y-4 p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 hover:bg-[#eae4d2]/20 dark:hover:bg-[#0c0d0d]/30 transition-all duration-300 group"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white group-hover:scale-110 transition-transform duration-300">
              {getIconComponent(value.icon)}
            </div>
            <h3 className="text-xl font-semibold text-[#0c0d0d] dark:text-[#eae4d2]">
              {value.title}
            </h3>
            <p className="text-[#575846] dark:text-[#eae4d2]/70 text-sm leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};