"use client";
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Leaf, 
  Activity,
  TreePine,
  Users,
  Globe,
  Target,
  Mail
} from 'lucide-react';
import { StatItems } from './StatItems';
import Link from 'next/link';
 

export const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const impactStats = [
    { value: 12847, label: "Trees Planted", icon: TreePine, delay: 0 },
    { value: 2500, label: "Youth Connected", icon: Users, delay: 200 },
    { value: 156, label: "Communities", icon: Globe, delay: 400 },
    { value: 89, label: "Active Projects", icon: Target, delay: 600 }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">#YouthForPlanet Movement</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Build the
                </span>
                <br />
                <span className="text-foreground">Future Together</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Join India's most vibrant community of planet-conscious youth transforming climate awareness into actionable change.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://forms.google.com/your-form-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105"
              >
                <span>Join The Movement</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                
                className="group  px-8 py-4 border-2 border-primary/30 bg-background/50 backdrop-blur-sm rounded-xl font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Link href="/founder/message" className='flex items-center gap-2  '>
                <Mail className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Founder's Message</span></Link>
              </button>
            </div>
          </div>

          {/* Interactive Stats Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, index) => (
                  <StatItems 
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    delay={stat.delay}
                  />
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-2">Live Impact Tracker</p>
                <div className="flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary">Updating in real-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};