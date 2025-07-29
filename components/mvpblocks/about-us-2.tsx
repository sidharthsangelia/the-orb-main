'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Leaf,
  Globe,
  Camera,
  BookOpen,
  Video,
  Mic,
  FileText,
  Target,
  Eye,
  Recycle,
  TreePine,
  Droplets,
  Sun,
  Heart,
  Lightbulb,
  Sprout,
  ArrowRight,
  Play
} from 'lucide-react';
import { NumberTicker } from '../magicui/number-ticker';
import { ThemeToggler } from '../ThemeToggler';
import ThemeToggleButton from '../ui/theme-toggle-button';

interface StatItemProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
  decimalPlaces?: number;
  color?: string;
  suffix?: string;
}

const StatItem = ({
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

export default function AboutUs() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const servicesRef = useRef(null);
  const journeyRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.3 });
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

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

  const coreValues = [
    {
      title: 'Planet First',
      description: 'Every decision we make prioritizes environmental impact and sustainability for future generations.',
      icon: <Leaf className="h-6 w-6" />,
    },
    {
      title: 'Youth Empowerment',
      description: 'We believe young voices are the catalyst for meaningful climate action and systemic change.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Authentic Storytelling',
      description: 'We share real stories from the ground to humanize climate issues and inspire genuine action.',
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: 'Knowledge for Action',
      description: 'We transform complex climate science into accessible, actionable knowledge for everyday implementation.',
      icon: <Lightbulb className="h-6 w-6" />,
    },
  ];

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

  const journey = [
    {
      year: '2022',
      title: 'The Spark',
      description: 'Founded by climate-conscious youth who saw the gap between awareness and action in India.',
    },
    {
      year: '2023',
      title: 'Building Community',
      description: 'Launched our first series of visual stories and began building our youth community.',
    },
    {
      year: '2024',
      title: 'Scaling Impact',
      description: 'Reached 50,000+ young people across 25 cities with our sustainability content and guides.',
    },
    {
      year: '2025',
      title: 'Documentary Vision',
      description: 'Launching our documentary project to track and celebrate India\'s sustainability transformation.',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#eae4d2]/20 via-transparent to-[#509e8e]/5">
      {/* Organic background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#509e8e]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#487052]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="organic-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="30" cy="30" r="1" fill="#575846" opacity="0.3"/>
                <circle cx="0" cy="0" r="1" fill="#487052" opacity="0.2"/>
                <circle cx="60" cy="60" r="1" fill="#509e8e" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#organic-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
        {/* Hero Section */}
        <div ref={heroRef} className="mx-auto mb-20 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6 flex justify-center"
          >
        
           
            <Badge
              variant="outline"
              className="border-[#487052]/30 bg-[#487052]/10 text-[#487052] dark:text-[#eae4d2] dark:border-[#509e8e]/30 dark:bg-[#509e8e]/10 rounded-full px-6 py-2 text-sm font-medium"
            >
              <Sprout className="mr-2 h-4 w-4" />
              Planet Conscious Youth
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="bg-gradient-to-b from-[#0c0d0d] via-[#575846] to-[#487052] dark:from-[#eae4d2] dark:via-[#eae4d2]/90 dark:to-[#509e8e] bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            Building Bridges Between
            <span className="block bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent">
              Awareness & Action
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-[#575846] dark:text-[#eae4d2]/80 mt-6 text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed"
          >
            We are <strong className="text-[#487052] dark:text-[#509e8e]">The Órb</strong> - a dynamic media organization driven by youth, 
            dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#487052] to-[#509e8e] hover:from-[#487052]/90 hover:to-[#509e8e]/90 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Movement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Stats Section */}
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

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="mb-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="relative space-y-6 p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white shadow-lg">
                <Target className="h-8 w-8" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
                Our Mission
              </h2>

              <p className="text-[#575846] dark:text-[#eae4d2]/80 text-lg leading-relaxed">
                To empower businesses and communities with innovative digital solutions that drive sustainable growth, 
                enhance user experiences, and create lasting environmental value in India's evolving green economy. 
                We connect climate awareness with tangible action through youth-driven initiatives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="relative space-y-6 p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#509e8e] to-[#487052] text-white shadow-lg">
                <Eye className="h-8 w-8" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]">
                Our Vision  
              </h2>

              <p className="text-[#575846] dark:text-[#eae4d2]/80 text-lg leading-relaxed">
                India is at a pivotal moment regarding its climate future. We envision a generation of empowered youth 
                leading India's green transformation, where sustainable living is essential, not a privilege. 
                We are the bridge between climate awareness and scalable action.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
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
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="text-center space-y-4 p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10 hover:bg-[#eae4d2]/20 dark:hover:bg-[#0c0d0d]/30 transition-all duration-300 group"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
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

        {/* What We Do Section */}
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

        {/* Journey Timeline */}
        <div ref={journeyRef} className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-16 text-center text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2]"
          >
            Our Journey
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#487052] to-[#509e8e] hidden md:block"></div>
            
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={journeyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
                className="relative mb-12 md:ml-16"
              >
                <div className="absolute -left-20 top-6 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#487052] to-[#509e8e] ring-4 ring-[#eae4d2] dark:ring-[#0c0d0d]"></div>
                
                <div className="p-8 rounded-2xl bg-[#eae4d2]/10 dark:bg-[#0c0d0d]/20 border border-[#575846]/10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#487052] to-[#509e8e] text-white font-bold text-sm">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0c0d0d] dark:text-[#eae4d2]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#575846] dark:text-[#eae4d2]/70 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-[#eae4d2]/20 via-[#509e8e]/10 to-[#487052]/20 dark:from-[#0c0d0d]/40 dark:via-[#575846]/20 dark:to-[#0c0d0d]/40 border border-[#575846]/20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-6">
              Connect With Us
            </h2>
            <p className="text-[#575846] dark:text-[#eae4d2]/80 text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              The future of our planet is being written right now — and you have a part to play in the story. 
              Whether you're a student, educator, creator, or someone who cares, we want to hear from you. 
              Real change begins with conversations, collaborations, and communities like ours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#487052] to-[#509e8e] hover:from-[#487052]/90 hover:to-[#509e8e]/90 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let's Build Together
                <Sprout className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-[#487052] dark:text-[#509e8e] font-semibold text-lg mt-6">
              #YouthforPlanet #CreativeClimateCampaigns
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}