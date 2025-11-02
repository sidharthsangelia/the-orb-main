import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { client } from "@/sanity/lib/client";

interface Slide {
  src: string;
  alt?: string;
}

interface CarouselPost {
  _id: string;
  title: string;
  category?: string;
  slides: Slide[];
}

const query = `*[_type == "carouselPost"] | order(_createdAt desc)[0...3]{
  _id,
  title,
  "category": category->title,
  slides[] {
    "src": image.asset->url,
    "alt": caption
  }
}`;

export default async function CarouselPosts() {
  const posts = await client.fetch<CarouselPost[]>(query);

  if (!posts?.length) return null;

  return (
    <section className="w-full  py-12 md:py-16 bg-background">
      <div className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#0c0d0d] dark:text-[#eae4d2] mb-4 sm:mb-6">
            Beyond the Blog: Visual Stories
          </h2>
          <p className="text-[#575846] dark:text-[#eae4d2]/70 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Dive into curated visual narratives and insights that go beyond traditional posts designed for quick, impactful learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="group flex flex-col space-y-3 rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Post Header */}
              <div className="px-4 pt-4 pb-2 space-y-1">
                <h2 className="text-lg font-semibold tracking-tight text-foreground line-clamp-2">
                  {post.title}
                </h2>
                {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">Carousel Post</span>
                  {post.category && (
                    <>
                      <span className="text-border">•</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        {post.category}
                      </span>
                    </>
                  )}
                </div> */}
              </div>

              {/* Carousel */}
              <div className="relative w-full  px-2 pt-2 pb-4">
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2">
                    {post.slides.map((slide, index) => (
                      <CarouselItem key={index} className="pl-2">
                        <Card className="border-0 shadow-none overflow-hidden rounded-2xl  ">
                          <CardContent className="p-0">
                            <div className="relative aspect-[4/5] w-full">
                              <Image
                                src={slide.src}
                                alt={slide.alt ?? `${post.title} - slide ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                priority={index === 0}
                                quality={90}
                              />
                            </div>
                        
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {/* Navigation Buttons - Only show if multiple slides */}
                  {post.slides.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 h-8 w-8 border-0 shadow-lg backdrop-blur-sm transition-all duration-200 disabled:opacity-40" />
                      <CarouselNext className="right-4 h-8 w-8  border-0 shadow-lg backdrop-blur-sm transition-all duration-200 disabled:opacity-40" />
                    </>
                  )}
                </Carousel>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}