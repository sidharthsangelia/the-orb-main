// Portable Text components for rich content rendering
import React from 'react'
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Quote, Calendar } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { founderMessageQuery, type FounderMessage } from "@/sanity/lib/queries";

import { FounderMessageQueryResult } from "@/sanity.types";

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 text-base leading-relaxed text-foreground/90 font-light">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl md:text-2xl font-bold mb-4 mt-8 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg md:text-xl font-semibold mb-3 mt-6 text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary/50 pl-4 italic text-base my-6 text-muted-foreground bg-muted/10 py-3 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

interface FounderMessagePageProps {
  data?: FounderMessageQueryResult | null;
}

const FounderMessagePage: React.FC<FounderMessagePageProps> = async () => {
  // Fetch data from Sanity
  let data: FounderMessageQueryResult | null = null;

  try {
    data = await client.fetch(founderMessageQuery);
  } catch (error) {
    console.error("Error fetching founder message:", error);
  }

  // Handle case where no data is found
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Founder's Message Not Found
          </h1>
          <p className="text-muted-foreground">
            Please check your Sanity configuration or create a founder message.
          </p>
        </div>
      </div>
    );
  }

  // Generate image URL with proper sizing
  let imageUrl: string | null = null;

  if (data?.founderImage?.asset?.url) {
    imageUrl = data.founderImage.asset.url;
  } else if (data?.founderImage) {
    try {
      imageUrl =
        urlForImage(data.founderImage)
          ?.width(300)
          .height(400)
          .fit("crop")
          .auto("format")
          .url() || null;
    } catch (error) {
      console.error("Error building image URL:", error);
    }
  }

  const imageBlurUrl = data?.founderImage?.asset?.metadata?.lqip;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/3">
      {/* Header Section */}
      <section className="pt-20 md:pt-24 lg:pt-28 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              {data.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Professional Newspaper Layout */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/8 backdrop-blur-md rounded-3xl border border-white/15 shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12 lg:p-16">
                
                {/* Content Container with proper text flow */}
                <div className="relative">
                  
                  {/* Founder Image & Info - Positioned for text wrap */}
                  <div className="md:float-left md:mr-10 mb-8 md:mb-6">
                    <div className="flex flex-col items-center max-w-sm mx-auto md:mx-0">
                      
                      {/* Founder Image */}
                      <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-2xl blur-xl" />
                        <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-muted">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={data.founderImage?.alt || "Founder"}
                              fill
                              className="object-cover"
                              priority
                              blurDataURL={imageBlurUrl ?? undefined}
                              sizes="(max-width: 768px) 224px, 256px"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                              <span className="text-4xl font-bold">
                                {data.founderName?.charAt(0) || "?"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Founder Details */}
                      <div className="text-center space-y-3">
                        <h2 className="text-2xl md:text-2xl font-bold text-foreground leading-tight">
                          {data.founderName}
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                          {data.founderTitle}
                        </p>
                        <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Message Content - Professional typography */}
                  <div className="text-foreground/95">
                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6">
                      <div className="space-y-6 text-justify md:text-left leading-relaxed">
                        <PortableText
                          value={data.message || []}
                          components={portableTextComponents}
                        />
                      </div>
                    </article>
                  </div>
                  
                  {/* Clear float */}
                  <div className="clear-both"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      {data.featuredQuote?.showQuote && data.featuredQuote.text && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform rotate-1" />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-secondary/5 rounded-3xl transform -rotate-1" />
                
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl text-center">
                  <div className="mb-8">
                    <Quote className="h-12 w-12 md:h-16 md:w-16 text-primary/60 mx-auto" />
                  </div>

                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 text-foreground max-w-4xl mx-auto">
                    <span className="italic">
                      "{data.featuredQuote.text}"
                    </span>
                  </blockquote>

                  <cite className="text-lg md:text-xl text-muted-foreground font-semibold">
                    — {data.founderName}
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Spacing */}
      <div className="pb-16 md:pb-20" />
    </div>
  );
};

export default FounderMessagePage;