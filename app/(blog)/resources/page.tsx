"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CTA } from '@/components/about/Cta';
import {
  BookOpen,
  Leaf,
  Camera,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  FileText,
  Heart,
  Clock,
  Eye,
  Globe,
  Sparkles,
  Lightbulb
} from 'lucide-react';

// Mock data - you'll replace this with Sanity CMS data
const mockGuides = [
  {
    id: 1,
    title: "Complete Guide to Home Composting",
    description: "Transform your kitchen waste into garden gold with this comprehensive composting guide.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Composting",
    type: "PDF Guide",
    downloadCount: "2.1k",
    category: "Waste Reduction"
  },
  {
    id: 2,
    title: "Zero Waste Living Handbook",
    description: "Step-by-step approach to reducing waste in your daily life.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Zero+Waste",
    type: "Interactive Guide",
    downloadCount: "3.4k",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "Urban Gardening for Beginners",
    description: "Grow your own food in small spaces with these proven techniques.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Gardening",
    type: "PDF Guide",
    downloadCount: "1.8k",
    category: "Agriculture"
  },
  {
    id: 4,
    title: "Energy Efficiency at Home",
    description: "Reduce your carbon footprint and energy bills with practical tips.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Energy+Saving",
    type: "Video Series",
    downloadCount: "2.7k",
    category: "Energy"
  }
];

const mockEducational = [
  {
    id: 1,
    title: "Climate Science Basics",
    description: "Understanding the fundamentals of climate change and global warming.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Climate+Science",
    type: "Course",
    duration: "2h 30m",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Renewable Energy Explained",
    description: "Comprehensive overview of solar, wind, and other renewable sources.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Renewable+Energy",
    type: "Workshop",
    duration: "1h 45m",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Biodiversity Conservation",
    description: "Learn about protecting ecosystems and endangered species.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Biodiversity",
    type: "Documentary",
    duration: "45m",
    level: "All Levels"
  },
  {
    id: 4,
    title: "Sustainable Transportation",
    description: "Exploring eco-friendly alternatives to traditional transport.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Transport",
    type: "Interactive",
    duration: "3h 15m",
    level: "Advanced"
  }
];

const mockClimateStories = [
  {
    id: 1,
    title: "Reforestation Success in Kenya",
    description: "How local communities planted 2 million trees and transformed their landscape.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Reforestation",
    organization: "Green Belt Movement",
    impact: "2M trees planted",
    readTime: "8 min read",
    date: "Dec 15, 2024"
  },
  {
    id: 2,
    title: "Ocean Cleanup Initiative",
    description: "Innovative technology removes plastic waste from the Pacific Ocean.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Ocean+Cleanup",
    organization: "Ocean Cleanup",
    impact: "50k kg plastic removed",
    readTime: "6 min read",
    date: "Dec 12, 2024"
  },
  {
    id: 3,
    title: "Solar Power for Rural Villages",
    description: "Bringing clean energy to remote communities in Bangladesh.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Solar+Power",
    organization: "Solar Foundation",
    impact: "500 villages powered",
    readTime: "10 min read",
    date: "Dec 10, 2024"
  },
  {
    id: 4,
    title: "Urban Farming Revolution",
    description: "Vertical farms feeding thousands in metropolitan areas.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Urban+Farming",
    organization: "City Harvest",
    impact: "10k families fed",
    readTime: "7 min read",
    date: "Dec 8, 2024"
  }
];

const mockYouthVoices = [
  {
    id: 1,
    title: "My Journey to Zero Waste",
    description: "A 16-year-old's inspiring transformation to sustainable living.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Youth+Voice+1",
    author: "Priya Sharma",
    readTime: "5 min read",
    likes: 234,
    date: "Dec 16, 2024",
    location: "Mumbai, India"
  },
  {
    id: 2,
    title: "Climate Activism in Schools",
    description: "How we organized our first environmental awareness campaign.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Youth+Voice+2",
    author: "Arjun Patel",
    readTime: "8 min read",
    likes: 189,
    date: "Dec 14, 2024",
    location: "Delhi, India"
  },
  {
    id: 3,
    title: "The Future We Want",
    description: "A young activist's vision for a sustainable world by 2050.",
    image: "https://placehold.co/300x200/509e8e/eae4d2?text=Youth+Voice+3",
    author: "Kavya Singh",
    readTime: "6 min read",
    likes: 312,
    date: "Dec 11, 2024",
    location: "Bangalore, India"
  },
  {
    id: 4,
    title: "Green Tech Innovations",
    description: "Exploring cutting-edge solutions for environmental challenges.",
    image: "https://placehold.co/300x200/487052/eae4d2?text=Youth+Voice+4",
    author: "Rohan Kumar",
    readTime: "10 min read",
    likes: 156,
    date: "Dec 9, 2024",
    location: "Chennai, India"
  }
];

const resourceCategories = [
  {
    id: 'guides',
    title: 'Guides & Handbooks',
    description: 'DIY sustainability guides to empower your daily life choices.',
    icon: <BookOpen className="h-8 w-8" />,
    href: '/resources/guides',
    count: '47 Guides'
  },
  {
    id: 'education',
    title: 'Educational Content',
    description: 'Deepen your understanding of climate science and action.',
    icon: <Leaf className="h-8 w-8" />,
    href: '/resources/education',
    count: '23 Courses'
  },
  {
    id: 'climate-stories',
    title: 'Climate Stories',
    description: 'Inspiring NGO impact and real-world case studies.',
    icon: <Camera className="h-8 w-8" />,
    href: '/resources/climate-stories',
    count: '156 Stories'
  },
  {
    id: 'youth-voices',
    title: 'Youth Voices',
    description: 'Authentic perspectives from young climate activists.',
    icon: <Users className="h-8 w-8" />,
    href: '/resources/youth-voices',
    count: '89 Posts'
  }
];

// Reusable component for displaying meta information with icons
const MetaInfo = ({ icon: Icon, text }) => (
  <span className="flex items-center space-x-1 text-sm text-[#eae4d2]/70">
    {Icon && <Icon className="h-4 w-4" />}
    <span>{text}</span>
  </span>
);

const ResourceCard = ({ item, type }) => {
  const getMetaInfo = () => {
    switch (type) {
      case 'guides':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <MetaInfo icon={Download} text={item.downloadCount} />
              <MetaInfo icon={FileText} text={item.type} />
            </div>
            <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium">{item.category}</span>
          </div>
        );
      case 'education':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <MetaInfo icon={Clock} text={item.duration} />
              <MetaInfo icon={Sparkles} text={item.level} />
            </div>
            <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium">{item.type}</span>
          </div>
        );
      case 'climate-stories':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <MetaInfo icon={Globe} text={item.organization} />
              <MetaInfo icon={Eye} text={item.readTime} />
            </div>
            <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium">{item.impact}</span>
          </div>
        );
      case 'youth-voices':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <MetaInfo icon={Heart} text={`${item.likes} Likes`} />
              <MetaInfo icon={Eye} text={item.readTime} />
            </div>
            <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium">{item.location}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(72, 112, 82, 0.3)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="block group bg-[#0c0d0d]/80 backdrop-blur-sm border border-[#575846]/30 hover:border-[#509e8e]/50 rounded-2xl p-6 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {type === 'education' && (
          <div className="absolute top-3 right-3 bg-[#487052]/80 backdrop-blur-sm rounded-full p-2">
            <Play className="h-5 w-5 text-[#eae4d2]" />
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-[#eae4d2] mb-3 group-hover:text-[#509e8e] transition-colors duration-200">
        {item.title}
      </h3>
      <p className="text-[#eae4d2]/70 text-sm mb-4 line-clamp-3">{item.description}</p>
      {getMetaInfo()}
    </motion.a>
  );
};

const CategoryCarousel = () => {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });
  const totalCards = resourceCategories.length;

  const next = () => {
    setCurrentIndex((prev) => (prev + 2) % totalCards);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 2 + totalCards) % totalCards);
  };

  return (
    <div className="relative overflow-hidden w-[548px] mx-auto">
      <motion.div
        ref={ref}
        className="flex gap-6 transition-transform duration-500 ease-out"
        animate={{ x: `-${currentIndex * (250 + 24)}px` }} // 250px card width + 24px gap
      >
        {resourceCategories.concat(resourceCategories).map((category, index) => (
          <motion.div
            key={`${category.id}-${index}`}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: (index % totalCards) * 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <motion.a
              href={category.href}
              whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(72, 112, 82, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="block w-[250px] aspect-square bg-[#0c0d0d]/80 backdrop-blur-sm border border-[#575846]/30 hover:border-[#509e8e]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white mb-4 w-fit">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#eae4d2] mb-2">{category.title}</h3>
                <p className="text-[#eae4d2]/70 text-sm line-clamp-3">{category.description}</p>
              </div>
              <div className="mt-4">
                <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium">
                  {category.count}
                </span>
              </div>
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-[#0c0d0d]/80 backdrop-blur-sm border border-[#575846]/30 hover:border-[#509e8e]/50 rounded-full p-3 hover:bg-[#509e8e]/10 transition-all duration-200 z-10 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6 text-[#eae4d2]" />
      </motion.button>

      <motion.button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#0c0d0d]/80 backdrop-blur-sm border border-[#575846]/30 hover:border-[#509e8e]/50 rounded-full p-3 hover:bg-[#509e8e]/10 transition-all duration-200 z-10 shadow-lg"
      >
        <ChevronRight className="h-6 w-6 text-[#eae4d2]" />
      </motion.button>
    </div>
  );
};

const ResourceSection = ({ title, description, items, type, href, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white shadow-lg flex-shrink-0">
            {icon}
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#eae4d2] mb-3 leading-tight">
              {title}
            </h2>
            <p className="text-[#eae4d2]/70 max-w-2xl text-lg">
              {description}
            </p>
          </div>
        </div>

        <motion.a
          href={href}
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(72, 112, 82, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center space-x-2 bg-[#487052]/20 hover:bg-[#487052]/30 border border-[#487052]/30 hover:border-[#487052]/50 px-6 py-3 rounded-full font-medium text-[#487052] hover:text-[#eae4d2] transition-all duration-200 self-start md:self-end"
        >
          <span>View All</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <ResourceCard item={item} type={type} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0c0d0d] text-[#eae4d2]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#487052]/5 to-[#509e8e]/5 animate-pulse-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-[#487052]/20 backdrop-blur-sm border border-[#487052]/30 rounded-full px-4 py-2 mb-8 shadow-md"
            >
              <Leaf className="h-4 w-4 text-[#487052]" />
              <span className="text-[#487052] font-medium text-sm">#PlanetConsciousYouth</span>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent mb-8 leading-tight animate-fade-in-up">
              Resources Hub
            </h1>
            <p className="text-xl lg:text-2xl text-[#eae4d2]/80 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-200">
              Everything you need to kickstart your sustainability journey. From practical guides to inspiring stories,
              discover tools that empower climate action and connect with a community driving real change.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Carousel */}
      <section className="py-20 bg-[#0c0d0d]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-[#eae4d2] mb-6">
              Explore Our Collections
            </h2>
            <p className="text-xl text-[#eae4d2]/70 max-w-3xl mx-auto leading-relaxed">
              Choose your path to making a difference. Each collection is carefully curated to support your environmental journey.
            </p>
          </motion.div>

          <CategoryCarousel />
        </div>
      </section>

      {/* Resource Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceSection
          title="Guides & Handbooks"
          description="Practical, actionable guides to help you implement sustainable practices in your daily life."
          items={mockGuides}
          type="guides"
          href="/resources/guides"
          icon={<BookOpen className="h-6 w-6" />}
        />

        <ResourceSection
          title="Educational Content"
          description="Interactive courses and workshops designed to deepen your understanding of climate science and action."
          items={mockEducational}
          type="education"
          href="/resources/education"
          icon={<Leaf className="h-6 w-6" />}
        />

        <ResourceSection
          title="Climate Stories"
          description="Inspiring case studies and impact stories from NGOs making a real difference in the world."
          items={mockClimateStories}
          type="climate-stories"
          href="/resources/climate-stories"
          icon={<Camera className="h-6 w-6" />}
        />

        <ResourceSection
          title="Youth Voices"
          description="Authentic stories and perspectives from young climate activists and changemakers in our community."
          items={mockYouthVoices}
          type="youth-voices"
          href="/resources/youth-voices"
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      {/* Bottom Spacing */}
      <div className="py-20" />
      <CTA/>
    </div>
  );
}