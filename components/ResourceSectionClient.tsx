// components/ResourceSectionClient.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ResourceCard,
  ResourceCardSkeleton,
} from "@/components/resources/ResourceCard";

import "swiper/css";
import "swiper/css/navigation";

interface Resource {
  _id: string;
  title: string;
  slug: string; // Updated to string, as queries return slug.current
  description?: string;
  type?: string;
  category?: { title: string; color?: { hex: string } };
  image?: string;
  date?: string;
  author?: { name: string; picture?: string };
  isFeatured?: boolean;
  status?: "draft" | "published";
  readTime?: number;
}

interface ResourceSectionClientProps {
  id: string;
  title: string;
  description: string;
  items: Resource[];
  type: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function ResourceSectionClient({
  id,
  title,
  description,
  items,
  type,
  href,
  icon,
}: ResourceSectionClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          {icon}
          <h2 className="ml-3 text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <p className="text-muted-foreground mb-12">{description}</p>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No {title.toLowerCase()} found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Check back later for new {title.toLowerCase()}.
            </p>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                prevEl: `.swiper-prev-${id}`,
                nextEl: `.swiper-next-${id}`,
              }}
              className="swiper-container"
            >
              {items
                .filter((item) => item.slug) // Skip items without a slug
                .map((item) => (
                  <SwiperSlide key={item._id}>
                    <ResourceCard
                      resource={{
                        _id: item._id,
                        title: item.title,
                        slug: item.slug, // Use slug directly
                        description: item.description,
                        type: type,
                        category: item.category,
                        image: item.image,
                        date: item.date,
                        author: item.author!,
                        isFeatured: item.isFeatured,
                        status: item.status,
                        readTime: item.readTime,
                      }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className={`swiper-prev-${id} absolute -left-10 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-md bg-background/80 backdrop-blur hover:bg-primary/10 hover:border-primary/30 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={items.length <= 3}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={`swiper-next-${id} absolute -right-10 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-md bg-background/80 backdrop-blur hover:bg-primary/10 hover:border-primary/30 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={items.length <= 3}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
}