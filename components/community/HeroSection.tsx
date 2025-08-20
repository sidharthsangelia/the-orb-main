"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Play,
  Leaf,
  Activity,
  TreePine,
  Users,
  Globe,
  Target,
  Mail,
} from "lucide-react";
import { StatItems } from "./StatItems";
import Link from "next/link";
import { HeroSectionData } from "@/types/community";

interface HeroSectionProps {
  data: HeroSectionData;
}

const iconMap = {
  TreePine,
  Users,
  Globe,
  Target,
};

export const HeroSection = ({ data }: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const impactStats = data.impactStats!.map((stat, index) => ({
    value: stat.value,
    label: stat.label,
    icon: iconMap[stat.icon],
    delay: index * 200,
  }));

  return (
    <section className="relative flex items-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-gradient-conic from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl animate-spin-slow opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 mt-10 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 mx-auto lg:mx-0">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {data.badge}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {data.mainHeading}
                </span>
                <br />
                <span className="text-foreground">{data.secondaryHeading}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {data.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={data.joinMovementUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105"
              >
                <span>Join The Movement</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={data.founderMessageUrl!}
                className="flex items-center justify-center"
              >
                <button className="group px-6 py-3 border-2 border-primary/30 bg-background/50 rounded-full backdrop-blur-sm font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Founder's Message</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          {/* Stats Section */}
          {/* Stats Section */}
          <div className="relative mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-6 sm:p-8">
              {/* Always 2x2 layout (mobile & desktop) */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
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

              {/* Footer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Live Impact Tracker
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary">
                    Updating in real-time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
