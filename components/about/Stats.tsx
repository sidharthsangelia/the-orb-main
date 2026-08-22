'use client';

import { Users, Globe, FileText, TreePine } from 'lucide-react';
import { StatItem } from './StatItem';

interface StatData {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: StatData[];
  className?: string;
}

const getIconForStat = (label: string, index: number) => {
  const lowerLabel = label.toLowerCase();
  const iconClass = 'h-4 w-4 sm:h-5 sm:w-5';

  if (lowerLabel.includes('youth') || lowerLabel.includes('aware')) {
    return <Users className={iconClass} />;
  }
  if (lowerLabel.includes('engaged') || lowerLabel.includes('global')) {
    return <Globe className={iconClass} />;
  }
  if (
    lowerLabel.includes('stories') ||
    lowerLabel.includes('published') ||
    lowerLabel.includes('content')
  ) {
    return <FileText className={iconClass} />;
  }
  if (
    lowerLabel.includes('cities') ||
    lowerLabel.includes('locations') ||
    lowerLabel.includes('reached')
  ) {
    return <TreePine className={iconClass} />;
  }

  const defaultIcons = [
    <Users key="users" className={iconClass} />,
    <Globe key="globe" className={iconClass} />,
    <FileText key="file" className={iconClass} />,
    <TreePine key="tree" className={iconClass} />,
  ];
  return defaultIcons[index % defaultIcons.length];
};

const getColorForStat = (index: number) => {
  const colors = [
    'from-brand to-brand-accent',
    'from-brand-accent to-brand',
    'from-muted-foreground to-brand',
    'from-brand to-muted-foreground',
  ];
  return colors[index % colors.length];
};

// "94%" -> { 94, "%" }, "50,000+" -> { 50000, "+" }
const parseStatValue = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, '');
  const suffix = value.replace(/[\d,]/g, '');
  return {
    numericValue: parseInt(numericValue, 10) || 0,
    suffix,
  };
};

export const StatsSection = ({ stats, className }: StatsSectionProps) => {
  if (!stats || stats.length === 0) return null;

  return (
    <section className={className} aria-label="The Órb by the numbers">
      <div className="container">
        {/*
         * One grid for every breakpoint — 2 up on phones, 4 up from `sm`.
         * This used to be two duplicated grids toggled with `sm:hidden`.
         */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const { numericValue, suffix } = parseStatValue(stat.value);

            return (
              <StatItem
                key={`${stat.label}-${index}`}
                value={numericValue}
                label={stat.label}
                icon={getIconForStat(stat.label, index)}
                delay={index * 0.1}
                decimalPlaces={0}
                color={getColorForStat(index)}
                suffix={suffix}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
