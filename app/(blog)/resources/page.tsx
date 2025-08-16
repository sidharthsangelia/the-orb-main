"use client";

import React, { useState, useEffect } from "react";
import { CTA } from "@/components/about/Cta";
import HeroSection from "@/components/resources/HeroSection";
import ResourceSectionClient from "@/components/ResourceSectionClient";
import {
  guidesQuery,
  educationQuery,
  climateStoriesQuery,
  youthVoicesQuery,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { BookOpen, Leaf, Users, Lightbulb } from "lucide-react";

export default function ResourcesPage() {
  const [guides, setGuides] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [climateStories, setClimateStories] = useState<any[]>([]);
  const [youthVoices, setYouthVoices] = useState<any[]>([]);

  const handleCategoryClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const [guidesData, educationData, climateData, youthData] =
          await Promise.all([
            client.fetch(guidesQuery),
            client.fetch(educationQuery),
            client.fetch(climateStoriesQuery),
            client.fetch(youthVoicesQuery),
          ]);
        if (!mounted) return;
        setGuides(guidesData || []);
        setEducation(educationData || []);
        setClimateStories(climateData || []);
        setYouthVoices(youthData || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = [
    { id: "guides", title: "Guides", icon: <BookOpen className="h-6 w-6" />, count: guides.length, description: "Practical guides for sustainable living and eco-friendly practices." },
    { id: "education", title: "Education", icon: <Lightbulb className="h-6 w-6" />, count: education.length, description: "Interactive courses on climate science and environmental action." },
    { id: "climate-stories", title: "Climate Stories", icon: <Leaf className="h-6 w-6" />, count: climateStories.length, description: "Inspiring tales of climate action from around the world." },
    { id: "youth-voices", title: "Youth Voices", icon: <Users className="h-6 w-6" />, count: youthVoices.length, description: "Stories and insights from young environmental leaders." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection categories={categories} onCategoryClick={handleCategoryClick} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ResourceSectionClient
          id="guides"
          title="Guides & Handbooks"
          description="Practical, actionable guides to help you implement sustainable practices in your daily life."
          items={guides}
          type="guides"
          icon={<BookOpen className="h-6 w-6" />}
          
        />
        <ResourceSectionClient
          id="education"
          title="Educational Content"
          description="Interactive courses and workshops designed to deepen your understanding of climate science and action."
          items={education}
          type="education"
          icon={<Lightbulb className="h-6 w-6" />}
        />
        <ResourceSectionClient
          id="climate-stories"
          title="Climate Stories"
          description="Inspiring case studies and impact stories from NGOs making a real difference in the world."
          items={climateStories}
          type="climate-stories"
          icon={<Leaf className="h-6 w-6" />}
        />
        <ResourceSectionClient
          id="youth-voices"
          title="Youth Voices"
          description="Authentic stories and perspectives from young climate activists and changemakers in our community."
          items={youthVoices}
          type="youth-voices"
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      <div className="py-20" />
      <CTA />
    </div>
  );
}