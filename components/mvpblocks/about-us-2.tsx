'use client';

import { BackgroundPattern } from "../about/BackgroundPattern";
import { CoreValuesSection } from "../about/CoreValues";
 
import { CTA } from "../about/Cta";
import { HeroSection } from "../about/HeroSection";
import { JourneyTimeline } from "../about/JourneyTimline";
import { MissionVisionSection } from "../about/MissionVision";
import { StatsSection } from "../about/Stats";
import TeamSectionVariant6 from "../about/Team";
import Team3 from "../about/Team";
import { WhatWeDo } from "../about/WhatWeDo";

  

export default function AboutUs() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Organic background pattern */}
      <BackgroundPattern />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Mission & Vision Section */}
        <MissionVisionSection />

        {/* Core Values */}
        <CoreValuesSection />

        {/* What We Do Section */}
        <WhatWeDo />

        {/* Journey Timeline */}
        <JourneyTimeline />
       
        {/* Our Team */}
{/* <TeamSectionVariant6/> */}
        {/* Call to Action */}
        <CTA />
      </div>
    </section>
  );
}