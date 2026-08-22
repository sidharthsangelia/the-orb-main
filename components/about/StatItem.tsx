'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { NumberTicker } from '../magicui/number-ticker';

interface StatItemProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
  decimalPlaces?: number;
  color?: string;
  suffix?: string;
}

export const StatItem = ({
  value,
  label,
  icon,
  delay = 0,
  decimalPlaces = 0,
  color = 'from-brand to-brand-accent',
  suffix = '',
}: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn(
        'group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-card/60 p-4 text-center backdrop-blur-sm',
        'shadow-sm transition-shadow duration-300 hover:shadow-md',
        // From `sm` up the icon sits beside the figure instead of above it.
        'sm:flex-row sm:items-center sm:gap-4 sm:p-6 sm:text-left',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-35 sm:h-24 sm:w-24',
          color,
        )}
      />

      <div
        aria-hidden
        className={cn(
          'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md sm:h-12 sm:w-12',
          color,
        )}
      >
        {icon}
      </div>

      <div className="relative z-10 flex min-w-0 flex-col">
        <p className="flex items-baseline justify-center text-2xl font-bold tracking-tight text-foreground sm:justify-start lg:text-3xl">
          <NumberTicker
            value={value}
            decimalPlaces={decimalPlaces}
            className="tabular-nums text-foreground dark:text-foreground"
          />
          {suffix && (
            <span className="ml-0.5 text-sm font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </p>
        {/*
         * No `truncate` here — labels like "Youth Aware of Climate Change"
         * were being clipped to a single ellipsised line on desktop.
         */}
        <p className="text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
          {label}
        </p>
      </div>
    </motion.div>
  );
};
