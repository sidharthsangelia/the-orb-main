"use client";

import React, { useState, useEffect } from "react";
import { Instagram, Twitter, Linkedin, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { sanityFetch } from "@/sanity/lib/fetch";
import { socialMediaPostsQuery, SocialMediaData, SocialMediaPost } from "@/sanity/lib/queries";

interface SocialMediaEmbedProps {
  embedHtml: string;
  fallbackDescription: string;
  platform: string;
}

const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = ({ embedHtml, fallbackDescription, platform }) => {
  useEffect(() => {
    if (platform === "instagram" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
    if (platform === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
    if (platform === "linkedin" && (window as any).IN?.parse) {
      (window as any).IN.parse();
    }
  }, [embedHtml, platform]);

  if (!embedHtml) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex flex-col items-center justify-center p-6 border border-border/50">
        <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground text-center mb-4">{fallbackDescription}</p>
        <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
          View on {platform}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return <div className="relative w-full h-96 rounded-xl overflow-hidden" dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

export const SocialMediaFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"instagram" | "linkedin" | "twitter">("instagram");
  const [socialData, setSocialData] = useState<SocialMediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        setLoading(true);
        const data = await sanityFetch<SocialMediaData>(socialMediaPostsQuery);
        setSocialData(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSocialData();
  }, []);

  const socialTabs = [
    socialData?.showInstagram && {
      key: "instagram" as const,
      icon: Instagram,
      label: "Instagram",
      count: socialData?.instagramPosts?.length || 0
    },
    socialData?.showLinkedin && {
      key: "linkedin" as const,
      icon: Linkedin,
      label: "LinkedIn",
      count: socialData?.linkedinPosts?.length || 0
    },
    socialData?.showTwitter && {
      key: "twitter" as const,
      icon: Twitter,
      label: "Twitter",
      count: socialData?.twitterPosts?.length || 0
    }
  ].filter(Boolean);

  const getCurrentPosts = (): SocialMediaPost[] => {
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
      <section className="py-20 bg-background text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading social media posts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background text-center">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive mb-2">Unable to load social media posts</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Follow Our Impact</h2>
          <p className="text-xl text-muted-foreground mt-2">Stay connected with our latest campaigns and stories</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm border border-border/50 inline-flex">
            {socialTabs.map(
              tab =>
                tab && (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    disabled={tab.count === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.key
                        ? "bg-background text-foreground shadow-lg shadow-primary/20 scale-105"
                        : tab.count === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-background/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count > 0 && <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">{tab.count}</span>}
                  </button>
                )
            )}
          </div>
        </div>

        {currentPosts.length === 0 ? (
          <p className="text-center text-muted-foreground">No {activeTab} posts available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post, index) => (
              <motion.div key={`${activeTab}-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <SocialMediaEmbed embedHtml={post.embedHtml} fallbackDescription={post.fallbackDescription} platform={activeTab} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
