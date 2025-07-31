'use client';

import { useRef } from 'react';
import { Users, Globe, FileText, TreePine } from 'lucide-react';
import { StatItem } from './StatItem';

export const StatsSection = () => {
  const statsRef = useRef(null);

  const stats = [
    {
      value: 94,
      label: 'Youth Aware of Climate Change',
      icon: <Users className="h-5 w-5" />,
      delay: 0,
      color: 'from-[#487052] to-[#509e8e]',
      suffix: '%',
    },
    {
      value: 50000,
      label: 'Youth Engaged',
      icon: <Globe className="h-5 w-5" />,
      delay: 0.1,
      color: 'from-[#509e8e] to-[#487052]',
      suffix: '+',
    },
    {
      value: 200,
      label: 'Stories Published',
      icon: <FileText className="h-5 w-5" />,
      delay: 0.2,
      color: 'from-[#575846] to-[#487052]',
      suffix: '+',
    },
    {
      value: 25,
      label: 'Cities Reached',
      icon: <TreePine className="h-5 w-5" />,
      delay: 0.3,
      color: 'from-[#487052] to-[#575846]',
      suffix: '+',
    },
  ];

  return (
    <div ref={statsRef} className="mb-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            delay={index * 0.1}
            decimalPlaces={0}
            color={stat.color}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </div>
  );
};