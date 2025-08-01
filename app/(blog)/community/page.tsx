"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  TreePine, 
  Heart, 
  Globe, 
  Target, 
  BookOpen, 
  Camera, 
  Mic, 
  PenTool, 
  ArrowRight, 
  CheckCircle, 
  Star,
  ExternalLink,
  MapPin,
  Calendar,
  MessageCircle,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
  Play,
  ChevronRight,
  Users2,
  Lightbulb,
  Leaf,
  Activity,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Quote,
  Sprout,
  ChevronDown,
  Mail,
  Phone,
  Clock,
  MapPin as Location,
  Share2,
  ThumbsUp,
  MessageSquare,
  Video,
  Image as ImageIcon,
  FileText,
  Headphones
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useInView } from 'framer-motion';
import { CTA } from '@/components/about/Cta';

// NumberTicker component (Magic UI implementation)
const NumberTicker = ({ value, direction = "up", delay = 0, decimalPlaces = 0, startValue = 0 }) => {
  const [count, setCount] = useState(startValue);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = direction === "up" 
        ? (value - startValue) / (duration / 16)
        : (startValue - value) / (duration / 16);
      let current = startValue;
      
      const counter = setInterval(() => {
        if (direction === "up") {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        } else {
          current -= increment;
          if (current <= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }
      }, 16);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, value, direction, delay, startValue]);
  
  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces 
      })}
    </span>
  );
};

// Enhanced StatItems component with NumberTicker
type StatItemsProps = {
  value: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
};

const StatItems = ({ value, label, icon: Icon, delay = 0 }: StatItemsProps) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
          <NumberTicker value={value} delay={delay} />+
        </div>
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
};

// Testimonial Card Component
type TestimonialCardProps = {
  name: string;
  role: string;
  content: string;
  avatar: React.ReactNode;
  delay?: number;
};

const TestimonialCard = ({ name, role, content, avatar, delay = 0 }: TestimonialCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105"
    >
      <Quote className="w-8 h-8 text-primary/40 mb-4" />
      <p className="text-muted-foreground mb-4 leading-relaxed">{content}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
          {avatar}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Social Media Embed Component
const SocialMediaFeed = () => {
  const [activeTab, setActiveTab] = useState('instagram');
  
  const socialPosts = {
    instagram: [
      {
        id: 1,
        type: 'image',
        content: 'Our tree plantation drive in Mumbai reached 1000 saplings! 🌱',
        likes: 2847,
        comments: 156,
        shares: 89,
        timestamp: '2 hours ago',
        image: '/api/placeholder/300/300'
      },
      {
        id: 2,
        type: 'video',
        content: 'Climate warriors from Delhi sharing their sustainability tips',
        likes: 4521,
        comments: 287,
        shares: 145,
        timestamp: '1 day ago',
        image: '/api/placeholder/300/300'
      }
    ],
    linkedin: [
      {
        id: 3,
        type: 'article',
        content: 'How Indian Youth Are Leading Climate Innovation - Latest Report',
        likes: 1245,
        comments: 78,
        shares: 234,
        timestamp: '3 hours ago',
        image: '/api/placeholder/300/200'
      }
    ],
    twitter: [
      {
        id: 4,
        type: 'text',
        content: 'Breaking: Our #YouthForPlanet campaign reaches 50M impressions! 🚀',
        likes: 8934,
        comments: 456,
        shares: 1205,
        timestamp: '4 hours ago'
      }
    ]
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50 inline-flex">
          {[
            { key: 'instagram', icon: Instagram, label: 'Instagram' },
            { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
            { key: 'twitter', icon: Twitter, label: 'Twitter' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === key 
                  ? 'bg-background text-foreground shadow-lg shadow-primary/20 scale-105' 
                  : 'hover:bg-background/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPosts[activeTab]?.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:shadow-xl transition-all duration-500"
          >
            {post.image && (
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 flex items-center justify-center">
                {post.type === 'video' ? <Video className="w-12 h-12 text-primary" /> : <ImageIcon className="w-12 h-12 text-primary" />}
              </div>
            )}
            <p className="text-sm leading-relaxed mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{post.timestamp}</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  {post.likes.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="w-3 h-3" />
                  {post.shares}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Interactive Timeline Component
const Timeline = () => {
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
  );
};

// Enhanced CTA Component
const EnhancedCTA = () => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  
  return (
    <div ref={ctaRef} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-primary/20"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-6">
          Connect With Us
        </h2>
        <p className="text-muted-foreground text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
          The future of our planet is being written right now — and you have a part to play in the story. 
          Whether you're a student, educator, creator, or someone who cares, we want to hear from you.
          Real change begins with conversations, collaborations, and communities like ours.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            Let's Build Together
            <Sprout className="w-5 h-5" />
          </button>
          <button className="border-2 border-primary/30 bg-transparent hover:bg-primary/5 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Get In Touch
          </button>
        </div>
        
        <p className="text-primary font-semibold text-lg">
          #YouthforPlanet #CreativeClimateCampaigns
        </p>
      </motion.div>
    </div>
  );
};

const CommunityPage = () => {
  const [activeRole, setActiveRole] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const impactStats = [
    { value: 12847, label: "Trees Planted", icon: TreePine, delay: 0 },
    { value: 2500, label: "Youth Connected", icon: Users, delay: 200 },
    { value: 156, label: "Communities", icon: Globe, delay: 400 },
    { value: 89, label: "Active Projects", icon: Target, delay: 600 }
  ];

  const communityRoles = [
    {
      title: "Visual Storytellers",
      description: "Create compelling visual narratives that make climate science accessible and engaging through infographics, videos, and interactive content.",
      icon: Camera,
      skills: ["Video Production", "Graphic Design", "Social Media"],
      impact: "50M+ views generated",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Climate Journalists",
      description: "Investigate and report on local environmental issues, policy changes, and community success stories across India.",
      icon: PenTool,
      skills: ["Research", "Writing", "Fact-checking"],
      impact: "200+ stories published",
      color: "from-green-500/20 to-teal-500/20"
    },
    {
      title: "Audio Creators",
      description: "Host podcasts, create audio documentaries, and amplify diverse voices in the climate conversation.",
      icon: Mic,
      skills: ["Audio Editing", "Interviewing", "Storytelling"],
      impact: "1M+ downloads",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Community Educators",
      description: "Design workshops, create educational resources, and lead sustainability initiatives in schools and communities.",
      icon: BookOpen,
      skills: ["Curriculum Design", "Public Speaking", "Workshop Facilitation"],
      impact: "10K+ students reached",
      color: "from-pink-500/20 to-violet-500/20"
    }
  ];

  const achievements = [
    { icon: Award, title: "Featured in National Media", desc: "Coverage by leading publications" },
    { icon: TrendingUp, title: "Fastest Growing Community", desc: "300% growth in 2024" },
    { icon: Users2, title: "Multi-City Presence", desc: "Active in 25+ cities" },
    { icon: Lightbulb, title: "Innovation Award Winner", desc: "Best Youth Initiative 2024" }
  ];

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Climate Journalist, Delhi",
      content: "This community gave me the platform to tell stories that matter. My articles on urban sustainability have now reached millions.",
      avatar: "AS",
      delay: 0
    },
    {
      name: "Priya Patel",
      role: "Visual Creator, Mumbai",
      content: "From zero followers to 100K+ in 8 months. The mentorship and collaboration opportunities here are unmatched.",
      avatar: "PP",
      delay: 0.2
    },
    {
      name: "Rahul Kumar",
      role: "Community Educator, Bangalore",
      content: "I've conducted workshops in 15 schools this year. The impact we're creating together is beyond anything I imagined.",
      avatar: "RK",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Asymmetric Design */}
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
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="group inline-flex items-center px-8 py-4 border-2 border-primary/30 bg-background/50 backdrop-blur-sm rounded-xl font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Watch Our Story</span>
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

      {/* Community Roles - Tabbed Interface */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Find Your Superpower
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every changemaker has a unique strength. Discover how your skills can drive India's sustainability revolution.
            </p>
          </div>

          <Tabs defaultValue="creators" className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <TabsList className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50">
                <TabsTrigger 
                  value="creators"
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 data-[state=active]:scale-105"
                >
                  Visual Storytellers
                </TabsTrigger>
                <TabsTrigger 
                  value="journalists"
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 data-[state=active]:scale-105"
                >
                  Climate Journalists
                </TabsTrigger>
                <TabsTrigger 
                  value="audio"
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 data-[state=active]:scale-105"
                >
                  Audio Creators
                </TabsTrigger>
                <TabsTrigger 
                  value="educators"
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 data-[state=active]:scale-105"
                >
                  Community Educators
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="creators" className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Visual Storytellers</h3>
                      <p className="text-primary font-medium">50M+ views generated</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Create compelling visual narratives that make climate science accessible and engaging through infographics, videos, and interactive content.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Key Skills You'll Develop:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Video Production", "Graphic Design", "Social Media"].map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">What You'll Do</h4>
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-4">
                        {[
                          "Create impactful content that reaches millions",
                          "Collaborate with like-minded changemakers",
                          "Get featured on national platforms",
                          "Access professional tools and resources",
                          "Receive mentorship from industry experts"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="journalists" className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl">
                      <PenTool className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Climate Journalists</h3>
                      <p className="text-primary font-medium">200+ stories published</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Investigate and report on local environmental issues, policy changes, and community success stories across India.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Key Skills You'll Develop:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Research", "Writing", "Fact-checking"].map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">What You'll Do</h4>
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-4">
                        {[
                          "Investigate local environmental issues",
                          "Interview climate experts and activists",
                          "Publish stories in leading publications",
                          "Build a portfolio of impactful journalism",
                          "Connect with media professionals"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Audio Creators</h3>
                      <p className="text-primary font-medium">1M+ downloads</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Host podcasts, create audio documentaries, and amplify diverse voices in the climate conversation.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Key Skills You'll Develop:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Audio Editing", "Interviewing", "Storytelling"].map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">What You'll Do</h4>
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-4">
                        {[
                          "Host engaging climate podcasts",
                          "Create audio documentaries",
                          "Interview change-makers nationwide",
                          "Build loyal listener communities",
                          "Get featured on major platforms"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="educators" className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-2xl">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Community Educators</h3>
                      <p className="text-primary font-medium">10K+ students reached</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Design workshops, create educational resources, and lead sustainability initiatives in schools and communities.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Key Skills You'll Develop:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Curriculum Design", "Public Speaking", "Workshop Facilitation"].map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-3xl blur-xl opacity-50"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">What You'll Do</h4>
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-4">
                        {[
                          "Design interactive climate workshops",
                          "Create educational resources",
                          "Lead school sustainability programs",
                          "Train other educators",
                          "Build community partnerships"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Timeline Section */}
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
            <Timeline />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Voices of Change</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from community members making a difference
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Feed Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Follow Our Impact
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay connected with our latest campaigns, success stories, and community highlights
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <SocialMediaFeed />
          </div>
        </div>
      </section>

      {/* Achievements Showcase */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recognition & Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our community's achievements speak louder than words
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                      <achievement.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <EnhancedCTA />
        </div>
      </section>

      {/* Final CTA - Creative Layout */}
      {/* <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The future starts now</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              Ready to Change
              <br />
              <span className="text-yellow-300">Everything?</span>
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of young changemakers who are already reshaping India's climate story. Your voice, your action, your impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://forms.google.com/your-form-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <span>Join The Revolution</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              <button className="inline-flex items-center px-10 py-5 border-2 border-white/30 backdrop-blur-sm rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                <MessageCircle className="mr-3 w-6 h-6" />
                Connect First
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default CommunityPage;