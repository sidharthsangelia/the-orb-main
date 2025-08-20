import { AboutPageData } from '@/types/about'; // Adjust import path as needed
import { BackgroundPattern } from "../about/BackgroundPattern";
import { CoreValuesSection } from "../about/CoreValues";
import { CTA } from "../about/Cta";
import { HeroSection } from "../about/HeroSection";
import { JourneyTimeline } from "../about/JourneyTimline";
import { MissionVisionSection } from "../about/MissionVision";
import { StatsSection } from "../about/Stats";
import { WhatWeDo } from "../about/WhatWeDo";
import { sanityFetch } from '@/sanity/lib/fetch';
import { aboutPageQuery } from '@/sanity/lib/queries';

export default async function AboutUs() {
  const aboutPageResult = await sanityFetch({ 
    query: aboutPageQuery
  });

  // Map possibly-null properties to non-null values
  const aboutData: AboutPageData | null = aboutPageResult
    ? {
        title: aboutPageResult.title ?? "Building Bridges Between Awareness & Action",
        tagline: aboutPageResult.tagline ?? "Building Bridges Between Awareness & Action",
        introText: aboutPageResult.introText ?? "We are The Órb - a dynamic media organization driven by youth, dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.",
        stats: (aboutPageResult.stats ?? []).map(stat => ({
          value: stat.value ?? "",
          label: stat.label ?? ""
        })),
        mission: aboutPageResult.mission ?? "",
        vision: aboutPageResult.vision ?? "",
        coreValues: (aboutPageResult.coreValues ?? []).map(value => ({
          title: value.title ?? "",
          description: value.description ?? "",
          icon: value.icon ?? ""
        })),
        whatWeDo: (aboutPageResult.whatWeDo ?? []).map(activity => ({
          title: activity.title ?? "",
          description: activity.description ?? "",
          icon: activity.icon ?? ""
        })),
        journey: (aboutPageResult.journey ?? []).map(journeyItem => ({
          year: journeyItem.year ?? "",
          title: journeyItem.title ?? "",
          description: journeyItem.description ?? ""
        }))
      }
    : null;

  // Fallback data in case Sanity data is not available
  const defaultData: AboutPageData = {
    title: "Building Bridges Between Awareness & Action",
    tagline: "Building Bridges Between Awareness & Action",
    introText: "We are The Órb - a dynamic media organization driven by youth, dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.",
    stats: [
      { value: "94%", label: "Youth Aware of Climate Change" },
      { value: "50,000+", label: "Youth Engaged" },
      { value: "200+", label: "Stories Published" },
      { value: "25+", label: "Cities Reached" }
    ],
    mission: "To empower businesses and communities with innovative digital solutions that drive sustainable growth, enhance user experiences, and create lasting environmental value in India's evolving green economy. We connect climate awareness with tangible action through youth-driven initiatives.",
    vision: "India is at a pivotal moment regarding its climate future. We envision a generation of empowered youth leading India's green transformation, where sustainable living is essential, not a privilege. We are the bridge between climate awareness and scalable action.",
    coreValues: [
      {
        title: "Planet First",
        description: "Every decision we make prioritizes environmental impact and sustainability for future generations.",
        icon: "Leaf"
      },
      {
        title: "Youth Empowerment",
        description: "We believe young voices are the catalyst for meaningful climate action and systemic change.",
        icon: "Users"
      },
      {
        title: "Authentic Storytelling",
        description: "We share real stories from the ground to humanize climate issues and inspire genuine action.",
        icon: "Heart"
      },
      {
        title: "Knowledge for Action",
        description: "We transform complex climate science into accessible, actionable knowledge for everyday implementation.",
        icon: "Lightbulb"
      }
    ],
    whatWeDo: [
      {
        title: "Visual Climate Stories",
        description: "Compelling visual narratives that explain, engage, and energize young minds about sustainability.",
        icon: "Camera"
      },
      {
        title: "Interactive Guides",
        description: "DIY handbooks and practical guides to help youth live more consciously and sustainably.",
        icon: "BookOpen"
      },
      {
        title: "Youth-Led Journalism",
        description: "Fresh, local perspectives on climate issues through authentic youth-driven reporting.",
        icon: "FileText"
      },
      {
        title: "Educational Content",
        description: "Bite-sized explainers and deep-dive content that makes sustainability relatable and reachable.",
        icon: "Video"
      },
      {
        title: "Community Building",
        description: "Creating spaces for climate-conscious youth to connect, collaborate, and create change together.",
        icon: "Users"
      },
      {
        title: "Documentary Projects",
        description: "Coming soon - tracking India's sustainability evolution through powerful documentary storytelling.",
        icon: "Play"
      }
    ],
    journey: [
      {
        year: "2022",
        title: "The Spark",
        description: "Founded by climate-conscious youth who saw the gap between awareness and action in India."
      },
      {
        year: "2023",
        title: "Building Community",
        description: "Launched our first series of visual stories and began building our youth community."
      },
      {
        year: "2024",
        title: "Scaling Impact",
        description: "Reached 50,000+ young people across 25 cities with our sustainability content and guides."
      },
      {
        year: "2025",
        title: "Documentary Vision",
        description: "Launching our documentary project to track and celebrate India's sustainability transformation."
      }
    ]
  };

  // Use Sanity data if available, otherwise use default data
  const data = aboutData || defaultData;

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Organic background pattern */}
      <BackgroundPattern />
      
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
        {/* Hero Section */}
        <HeroSection 
          title={data.title}
          tagline={data.tagline}
          introText={data.introText}
        />
        
        {/* Stats Section */}
        <StatsSection stats={data.stats} />
        
        {/* Mission & Vision Section */}
        <MissionVisionSection 
          mission={data.mission}
          vision={data.vision}
        />
        
        {/* Core Values */}
        <CoreValuesSection coreValues={data.coreValues} />
        
        {/* What We Do Section */}
        <WhatWeDo activities={data.whatWeDo} />
        
        {/* Journey Timeline */}
        <JourneyTimeline journey={data.journey} />
                
        {/* Call to Action */}
        <CTA />
      </div>
    </section>
  );
}