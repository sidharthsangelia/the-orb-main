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
  color = 'from-[#487052] to-[#509e8e]',
  suffix = '',
}: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      className={cn(
        'group relative overflow-hidden rounded-lg sm:rounded-xl border border-[#575846]/20 bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/40 backdrop-blur-sm w-full',
        'shadow-lg shadow-[#575846]/10 dark:shadow-[#0c0d0d]/20 hover:shadow-xl transition-all duration-300',
        // Mobile: compact padding and height, Desktop: original padding
        'p-3 min-h-[120px] sm:p-6 sm:min-h-auto',
      )}
    >
      <div
        className={cn(
          'absolute -top-4 -right-4 sm:-top-6 sm:-right-6 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-3xl',
          'h-12 w-12 sm:h-24 sm:w-24', // Smaller glow effect on mobile
          color,
        )}
      />

      {/* Mobile Layout - Compact 2x2 Card */}
      <div className="flex flex-col sm:hidden items-center text-center justify-center h-full gap-2 relative z-10">
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white shadow-md',
            color,
          )}
        >
          {icon}
        </div>

        <div className="flex flex-col items-center">
          <h3 className="flex items-baseline text-xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
            <NumberTicker
              value={value}
              decimalPlaces={decimalPlaces}
              className="tabular-nums"
            />
            <span className="ml-0.5 text-xs font-medium opacity-70">{suffix}</span>
          </h3>
          <p className="text-[#575846] dark:text-[#eae4d2]/70 text-xs font-medium leading-tight text-center px-1">
            {label}
          </p>
        </div>
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden sm:flex items-center gap-4 relative z-10">
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg',
            color,
          )}
        >
          {icon}
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="flex items-baseline text-2xl lg:text-3xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
            <NumberTicker
              value={value}
              decimalPlaces={decimalPlaces}
              className="tabular-nums"
            />
            <span className="ml-1 text-sm font-medium opacity-70">{suffix}</span>
          </h3>
          <p className="text-[#575846] dark:text-[#eae4d2]/70 text-sm font-medium truncate">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};