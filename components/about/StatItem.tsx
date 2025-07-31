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
        'group relative overflow-hidden rounded-xl border border-[#575846]/20 bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/40 p-6 backdrop-blur-sm',
        'shadow-lg shadow-[#575846]/10 dark:shadow-[#0c0d0d]/20 hover:shadow-xl transition-all duration-300',
      )}
    >
      <div
        className={cn(
          'absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-3xl',
          color,
        )}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg',
            color,
          )}
        >
          {icon}
        </div>

        <div className="flex flex-col">
          <h3 className="flex items-baseline text-3xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
            <NumberTicker
              value={value}
              decimalPlaces={decimalPlaces}
              className="tabular-nums"
            />
            <span className="ml-1 text-sm font-medium opacity-70">{suffix}</span>
          </h3>
          <p className="text-[#575846] dark:text-[#eae4d2]/70 text-sm font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};