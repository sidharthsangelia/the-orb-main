'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
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
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

interface CoreValuesSectionProps {
  coreValues: CoreValue[];
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
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
};

const defaultCoreValues: CoreValue[] = [
  {
    title: 'Planet First',
    description:
      'Every decision we make prioritizes environmental impact and sustainability for future generations.',
    icon: 'Leaf',
  },
  {
    title: 'Youth Empowerment',
    description:
      'We believe young voices are the catalyst for meaningful climate action and systemic change.',
    icon: 'Users',
  },
  {
    title: 'Authentic Storytelling',
    description:
      'We share real stories from the ground to humanize climate issues and inspire genuine action.',
    icon: 'Heart',
  },
  {
    title: 'Knowledge for Action',
    description:
      'We transform complex climate science into accessible, actionable knowledge for everyday implementation.',
    icon: 'Lightbulb',
  },
];

export const CoreValuesSection = ({
  coreValues,
  className,
}: CoreValuesSectionProps) => {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  const displayValues =
    coreValues && coreValues.length > 0 ? coreValues : defaultCoreValues;

  return (
    <section
      ref={valuesRef}
      className={cn('section-y', className)}
      aria-label="Our core values"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow="What we stand for"
            title="Our core values"
            description="The principles that guide every story we tell, every community we build, and every action we inspire."
            className="mb-12 sm:mb-16"
          />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayValues.map((value, index) => {
            const Icon = iconMap[value.icon] ?? Leaf;

            return (
              <motion.article
                key={`${value.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
                className="group flex h-full flex-col rounded-xl border border-border bg-card/60 p-6 text-center transition-all duration-300 hover:border-brand-accent/40 hover:bg-card sm:p-7"
              >
                <span
                  aria-hidden
                  className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-accent text-brand-foreground shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>

                <h3 className="text-lg font-semibold leading-tight text-foreground">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
