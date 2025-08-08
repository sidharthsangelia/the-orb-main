'use client';

import { useRef } from 'react';
import { Users, Globe, FileText, TreePine } from 'lucide-react';
import { StatItem } from './StatItem';

interface StatData {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: StatData[];
}

// Icon mapping for different stat types - you can expand this based on your needs
const getIconForStat = (label: string, index: number) => {
  const lowerLabel = label.toLowerCase();
  
  if (lowerLabel.includes('youth') || lowerLabel.includes('aware')) {
    return <Users className="h-5 w-5" />;
  } else if (lowerLabel.includes('engaged') || lowerLabel.includes('global')) {
    return <Globe className="h-5 w-5" />;
  } else if (lowerLabel.includes('stories') || lowerLabel.includes('published') || lowerLabel.includes('content')) {
    return <FileText className="h-5 w-5" />;
  } else if (lowerLabel.includes('cities') || lowerLabel.includes('locations') || lowerLabel.includes('reached')) {
    return <TreePine className="h-5 w-5" />;
  }
  
  // Default icons based on index if no match found
  const defaultIcons = [<Users className="h-5 w-5" />, <Globe className="h-5 w-5" />, <FileText className="h-5 w-5" />, <TreePine className="h-5 w-5" />];
  return defaultIcons[index % defaultIcons.length];
};

const getColorForStat = (index: number) => {
  const colors = [
    'from-[#487052] to-[#509e8e]',
    'from-[#509e8e] to-[#487052]',
    'from-[#575846] to-[#487052]',
    'from-[#487052] to-[#575846]',
  ];
  return colors[index % colors.length];
};

// Extract numeric value and suffix from string like "94%" or "50,000+"
const parseStatValue = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, '');
  const suffix = value.replace(/[\d,]/g, '');
  return {
    numericValue: parseInt(numericValue) || 0,
    suffix: suffix
  };
};

export const StatsSection = ({ stats }: StatsSectionProps) => {
  const statsRef = useRef(null);

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div ref={statsRef} className="mb-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const { numericValue, suffix } = parseStatValue(stat.value);
          
          return (
            <StatItem
              key={index}
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
  );
};