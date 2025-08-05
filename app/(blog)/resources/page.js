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
  Eye
} from 'lucide-react';

// Mock data - you'll replace this with Sanity CMS data
const mockGuides = [
  {
    id: 1,
    title: "Complete Guide to Home Composting",
    description: "Transform your kitchen waste into garden gold with this comprehensive composting guide.",
    image: "/api/placeholder/300/200",
    type: "PDF Guide",
    downloadCount: "2.1k",
    category: "Waste Reduction"
  },
  {
    id: 2,
    title: "Zero Waste Living Handbook",
    description: "Step-by-step approach to reducing waste in your daily life.",
    image: "/api/placeholder/300/200",
    type: "Interactive Guide",
    downloadCount: "3.4k",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "Urban Gardening for Beginners",
    description: "Grow your own food in small spaces with these proven techniques.",
    image: "/api/placeholder/300/200",
    type: "PDF Guide",
    downloadCount: "1.8k",
    category: "Agriculture"
  },
  {
    id: 4,
    title: "Energy Efficiency at Home",
    description: "Reduce your carbon footprint and energy bills with practical tips.",
    image: "/api/placeholder/300/200",
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
    image: "/api/placeholder/300/200",
    type: "Course",
    duration: "2h 30m",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Renewable Energy Explained",
    description: "Comprehensive overview of solar, wind, and other renewable sources.",
    image: "/api/placeholder/300/200",
    type: "Workshop",
    duration: "1h 45m",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Biodiversity Conservation",
    description: "Learn about protecting ecosystems and endangered species.",
    image: "/api/placeholder/300/200",
    type: "Documentary",
    duration: "45m",
    level: "All Levels"
  },
  {
    id: 4,
    title: "Sustainable Transportation",
    description: "Exploring eco-friendly alternatives to traditional transport.",
    image: "/api/placeholder/300/200",
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
    image: "/api/placeholder/300/200",
    organization: "Green Belt Movement",
    impact: "2M trees planted",
    readTime: "8 min read",
    date: "Dec 15, 2024"
  },
  {
    id: 2,
    title: "Ocean Cleanup Initiative",
    description: "Innovative technology removes plastic waste from the Pacific Ocean.",
    image: "/api/placeholder/300/200",
    organization: "Ocean Cleanup",
    impact: "50k kg plastic removed",
    readTime: "6 min read",
    date: "Dec 12, 2024"
  },
  {
    id: 3,
    title: "Solar Power for Rural Villages",
    description: "Bringing clean energy to remote communities in Bangladesh.",
    image: "/api/placeholder/300/200",
    organization: "Solar Foundation",
    impact: "500 villages powered",
    readTime: "10 min read",
    date: "Dec 10, 2024"
  },
  {
    id: 4,
    title: "Urban Farming Revolution",
    description: "Vertical farms feeding thousands in metropolitan areas.",
    image: "/api/placeholder/300/200",
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
    image: "/api/placeholder/300/200",
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
    image: "/api/placeholder/300/200",
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
    image: "/api/placeholder/300/200",
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
    image: "/api/placeholder/300/200",
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
    description: 'DIY sustainability guides',
    icon: <BookOpen className="h-8 w-8" />,
    href: '/resources/guides',
    count: '47 Guides'
  },
  {
    id: 'education',
    title: 'Educational Content',
    description: 'Learn about climate action',
    icon: <Leaf className="h-8 w-8" />,
    href: '/resources/education',
    count: '23 Courses'
  },
  {
    id: 'climate-stories',
    title: 'Climate Stories',
    description: 'NGO impact and case studies',
    icon: <Camera className="h-8 w-8" />,
    href: '/resources/climate-stories',
    count: '156 Stories'
  },
  {
    id: 'youth-voices',
    title: 'Youth Voices',
    description: 'Blogs by connected youth',
    icon: <Users className="h-8 w-8" />,
    href: '/resources/youth-voices',
    count: '89 Posts'
  }
];

const ResourceCard = ({ item, type }) => {
  const getMetaInfo = () => {
    switch (type) {
      case 'guides':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-sm text-[#eae4d2]/60">
              <span className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{item.downloadCount}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{item.type}</span>
              </span>
            </div>
            <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium border border-[#487052]/30">
              {item.category}
            </span>
          </div>
        );
      case 'education':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-sm text-[#eae4d2]/60">
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{item.duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Play className="h-4 w-4" />
                <span>{item.type}</span>
              </span>
            </div>
            <span className="px-3 py-1 bg-[#509e8e]/20 text-[#509e8e] rounded-full text-xs font-medium border border-[#509e8e]/30">
              {item.level}
            </span>
          </div>
        );
      case 'climate-stories':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-[#eae4d2]/60">
              <span className="text-[#487052] font-medium">{item.organization}</span>
              <span>{item.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#eae4d2]/60">{item.readTime}</span>
              <span className="px-3 py-1 bg-[#487052]/20 text-[#487052] rounded-full text-xs font-medium border border-[#487052]/30">
                {item.impact}
              </span>
            </div>
          </div>
        );
      case 'youth-voices':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-[#eae4d2]/60">
              <span>By <span className="text-[#509e8e] font-medium">{item.author}</span></span>
              <span>{item.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#eae4d2]/60">{item.location} • {item.readTime}</span>
              <span className="flex items-center space-x-1 text-sm">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-[#eae4d2]/60">{item.likes}</span>
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-[#0c0d0d]/60 backdrop-blur-sm rounded-2xl border border-[#575846]/30 hover:border-[#487052]/50 transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      <div className="aspect-video bg-gradient-to-br from-[#575846]/20 to-[#487052]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0d]/60 to-transparent" />
        <div className="absolute top-3 right-3 bg-[#0c0d0d]/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-[#eae4d2] text-xs font-medium">Featured</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 text-[#eae4d2] line-clamp-2 group-hover:text-[#487052] transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-[#eae4d2]/70 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        {getMetaInfo()}
      </div>
    </motion.div>
  );
};

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 2;
  
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsToShow >= resourceCategories.length ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, resourceCategories.length - itemsToShow) : prev - 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-8"
          animate={{ x: `${-currentIndex * (100 / itemsToShow)}%` }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          {resourceCategories.map((category, index) => (
            <div key={category.id} className="flex-none w-1/2 lg:w-1/2">
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#487052] to-[#509e8e] rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                
                <div className="relative bg-[#0c0d0d]/60 backdrop-blur-sm rounded-3xl p-8 border border-[#575846]/30 group-hover:border-[#487052]/50 transition-all duration-300 h-full">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white mb-6 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-[#eae4d2] group-hover:text-[#487052] transition-colors duration-200">
                    {category.title}
                  </h3>
                  
                  <p className="text-[#eae4d2]/70 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#eae4d2]/50">
                      {category.count}
                    </span>
                    <div className="flex items-center space-x-2 text-[#eae4d2]/70 group-hover:text-[#487052] transition-colors duration-200">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#0c0d0d]/80 backdrop-blur-sm border border-[#575846]/30 hover:border-[#487052]/50 rounded-full p-3 hover:bg-[#487052]/10 transition-all duration-200 z-10"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-6 w-6 text-[#eae4d2]" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#0c0d0d]/80 backdrop-blur-sm border border-[#575846]/30 hover:border-[#487052]/50 rounded-full p-3 hover:bg-[#487052]/10 transition-all duration-200 z-10"
        disabled={currentIndex + itemsToShow >= resourceCategories.length}
      >
        <ChevronRight className="h-6 w-6 text-[#eae4d2]" />
      </button>
    </div>
  );
};

const ResourceSection = ({ title, description, items, type, href, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20"
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#487052] to-[#509e8e] text-white">
            {icon}
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#eae4d2] mb-2">
              {title}
            </h2>
            <p className="text-[#eae4d2]/70 max-w-2xl text-lg">
              {description}
            </p>
          </div>
        </div>
        
        <motion.a
          href={href}
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 bg-[#487052]/20 hover:bg-[#487052]/30 border border-[#487052]/30 hover:border-[#487052]/50 px-6 py-3 rounded-full font-medium text-[#487052] hover:text-[#eae4d2] transition-all duration-200"
        >
          <span>View All</span>
          <ArrowRight className="h-5 w-5" />
        </motion.a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
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
    <div className="min-h-screen bg-[#0c0d0d]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#487052]/5 to-[#509e8e]/5" />
        
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
              className="inline-flex items-center space-x-2 bg-[#487052]/20 backdrop-blur-sm border border-[#487052]/30 rounded-full px-4 py-2 mb-8"
            >
              <Leaf className="h-4 w-4 text-[#487052]" />
              <span className="text-[#487052] font-medium text-sm">#PlanetConsciousYouth</span>
            </motion.div>
            
            <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-[#487052] to-[#509e8e] bg-clip-text text-transparent mb-8 leading-tight">
              Resources Hub
            </h1>
            <p className="text-xl lg:text-2xl text-[#eae4d2]/80 max-w-4xl mx-auto leading-relaxed mb-12">
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
      <CTA />
    </div>
  );
}