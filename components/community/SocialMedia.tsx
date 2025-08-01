"use client";

import React, { useState, useRef } from 'react';
import { 
  Instagram,
  Twitter,
  Linkedin,
  Video,
  Image,
  ThumbsUp,
  MessageSquare,
  Share2,
  Award,
  TrendingUp,
  Users2,
  Lightbulb,
  Sprout,
  Mail,
  ArrowRight
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Social Media Feed Component
export const SocialMediaFeed = () => {
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

  const socialTabs = [
    { key: 'instagram', icon: Instagram, label: 'Instagram' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { key: 'twitter', icon: Twitter, label: 'Twitter' }
  ];
  
  return (
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
        
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50 inline-flex">
              {socialTabs.map(({ key, icon: Icon, label }) => (
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
                    {post.type === 'video' ? 
                      <Video className="w-12 h-12 text-primary" /> : 
                      <Image className="w-12 h-12 text-primary" />
                    }
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
      </div>
    </section>
  );
};
