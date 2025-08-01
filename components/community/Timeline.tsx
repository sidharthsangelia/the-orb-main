import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Globe, Award, Zap, Star } from 'lucide-react';

export const Timeline = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Started with 50 passionate youth in Mumbai',
      icon: Sprout,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      year: '2021',
      title: 'First Campaign',
      description: 'Launched #PlasticFreeIndia reaching 1M people',
      icon: Globe,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      year: '2022',
      title: 'National Recognition',
      description: 'Featured in Times of India, awarded Best Youth Initiative',
      icon: Award,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      year: '2023',
      title: 'Digital Revolution',
      description: 'Reached 10M+ through viral climate content',
      icon: Zap,
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Leading India\'s largest youth climate movement',
      icon: Star,
      color: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From a small group of passionate youth to India's largest climate movement
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6"
                >
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${milestone.color} backdrop-blur-sm border border-border/50 rounded-2xl flex items-center justify-center`}>
                      <milestone.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};