"use client";

import React, { useState, useEffect } from "react";
import { CTA } from "@/components/about/Cta";
import CategoryCarousel from "@/components/resources/CategoryCarousel";
import ResourceSectionClient from "@/components/ResourceSectionClient";
import HeroSection from "@/components/resources/HeroSection";
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
    { id: "guides", title: "Guides", icon: <BookOpen className="h-6 w-6" />, count: guides.length },
    { id: "education", title: "Education", icon: <Lightbulb className="h-6 w-6" />, count: education.length },
    { id: "climate-stories", title: "Climate Stories", icon: <Leaf className="h-6 w-6" />, count: climateStories.length },
    { id: "youth-voices", title: "Youth Voices", icon: <Users className="h-6 w-6" />, count: youthVoices.length },
  ];

  return (
    <div className="min-h-screen bg-[#0c0d0d] text-[#eae4d2]">
      <HeroSection />

      <section className="py-20 bg-[#0c0d0d]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#eae4d2] mb-6">Explore Our Collections</h2>
            <p className="text-xl text-[#eae4d2]/70 max-w-3xl mx-auto leading-relaxed">
              Choose your path to making a difference. Each collection is carefully curated to support your environmental journey.
            </p>
          </div>

          <CategoryCarousel categories={categories} onCategoryClick={handleCategoryClick} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
