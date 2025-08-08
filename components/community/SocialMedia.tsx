"use client";

import React, { useState, useEffect } from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  socialMediaPostsQuery,
  type SocialMediaData,
} from "@/sanity/lib/queries";

// Embed component for full HTML embed codes
const SocialMediaEmbed = ({ embedUrl, fallbackDescription, platform }) => {
  useEffect(() => {
    if (platform === "instagram" && window.instgrm) {
      window.instgrm.Embeds.process();
    }

    if (platform === "twitter" && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }

    // LinkedIn auto-renders embeds when their script is loaded
    if (platform === "linkedin" && window.IN && window.IN.parse) {
      window.IN.parse();
    }
  }, [embedUrl, platform]);

  if (!embedUrl) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex flex-col items-center justify-center p-6 border border-border/50">
        <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground text-center mb-4">
          {fallbackDescription}
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          View on {platform}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-96 rounded-xl overflow-hidden"
      dangerouslySetInnerHTML={{ __html: embedUrl }}
    />
  );
};

// Main Social Media Feed Component
export const SocialMediaFeed = () => {
  const [activeTab, setActiveTab] = useState("instagram");
  const [socialData, setSocialData] = useState<SocialMediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch social media data from Sanity
  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await sanityFetch(socialMediaPostsQuery );

        if (!data) {
          throw new Error("No social media posts found");
        }

        setSocialData(data);
      } catch (err: any) {
        console.error("Error fetching social media posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialData();
  }, []);

  const socialTabs = [
    {
      key: "instagram",
      icon: Instagram,
      label: "Instagram",
      count: socialData?.instagramPosts?.length || 0,
    },
    {
      key: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      count: socialData?.linkedinPosts?.length || 0,
    },
    {
      key: "twitter",
      icon: Twitter,
      label: "Twitter",
      count: socialData?.twitterPosts?.length || 0,
    },
  ];

  const getCurrentPosts = () => {
    if (!socialData) return [];
    switch (activeTab) {
      case "instagram":
        return socialData.instagramPosts || [];
      case "linkedin":
        return socialData.linkedinPosts || [];
      case "twitter":
        return socialData.twitterPosts || [];
      default:
        return [];
    }
  };

  const currentPosts = getCurrentPosts();

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Follow Our Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay connected with our latest campaigns, success stories, and
            community highlights
          </p>
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">
              Loading social media posts...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Follow Our Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay connected with our latest campaigns, success stories, and
            community highlights
          </p>
          <div className="flex flex-col items-center justify-center py-16">
            <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-destructive text-center mb-4">
              Unable to load social media posts
            </p>
            <p className="text-sm text-muted-foreground text-center">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Follow Our Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay connected with our latest campaigns, success stories, and
            community highlights
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50 inline-flex">
              {socialTabs.map(({ key, icon: Icon, label, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  disabled={count === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === key
                      ? "bg-background text-foreground shadow-lg shadow-primary/20 scale-105"
                      : count === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-background/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {count > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {currentPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === "instagram" && (
                  <Instagram className="w-8 h-8 text-primary" />
                )}
                {activeTab === "linkedin" && (
                  <Linkedin className="w-8 h-8 text-primary" />
                )}
                {activeTab === "twitter" && (
                  <Twitter className="w-8 h-8 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground">
                No {activeTab} posts available at the moment
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:shadow-xl transition-all duration-500"
                >
                  <SocialMediaEmbed
                    embedUrl={post.embedUrl}
                    fallbackDescription={post.fallbackDescription}
                    platform={activeTab}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
