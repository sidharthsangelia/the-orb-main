// components/resources/ResourceCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, Leaf } from "lucide-react";
import { format, parseISO } from "date-fns";
import Avatar from "../avatar";

interface Resource {
  _id: string;
  title: string;
  slug: string; // Updated to string
  description?: string;
  image?: string;
  date?: string;
  author?: { name: string; picture?: string };
  category?: { title: string; color?: { hex: string } };
  isFeatured?: boolean;
  status?: "draft" | "published";
  readTime?: number;
  type: string;
}

interface ResourceCardProps {
  resource: Resource;
  large?: boolean;
  className?: string;
}

export const ResourceCard = ({
  resource,
  large = false,
  className = "",
}: ResourceCardProps) => {
  const readingTime =
    resource.readTime ||
    (resource.description ? Math.ceil(resource.description.length / 250) : 5);

  return (
   <Card
  className={`group overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card border-border rounded-lg ${large ? "md:col-span-2 lg:col-span-2" : "w-full h-full"} ${className}`}
>
  <Link href={`/resources/${resource.type}/${resource.slug}`} className="block">
    <div
        className={`relative overflow-hidden rounded-t-lg ${
    large
      ? "h-72 md:h-96" // Bigger large card image
      : "h-48 sm:h-56" // Bigger normal card image
  }`}
    >
      {resource.image ? (
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={
            large
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-t-lg">
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
              <Leaf className="h-4 w-4 sm:h-6 text-primary" />
            </div>
            <span className="text-primary text-xs sm:text-sm font-medium">
              Resource
            </span>
          </div>
        </div>
      )}

      {resource.category?.title && (
        <Badge
          className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-card/90 backdrop-blur-sm border-primary/20 text-xs sm:text-sm"
          style={{
            backgroundColor: `${resource.category.color?.hex || "hsl(var(--primary))"}15`,
            color: resource.category.color?.hex || "hsl(var(--primary))",
            borderLeft: `3px solid ${resource.category.color?.hex || "hsl(var(--primary))"}`,
          }}
        >
          {resource.category.title}
        </Badge>
      )}

      {resource.isFeatured && (
        <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-orange-500/90 text-white border-0 animate-pulse">
          Featured
        </Badge>
      )}
    </div>
  </Link>

  <CardContent className="p-4 sm:p-6 space-y-2 sm:space-y-3">
    {/* Meta Info */}
    <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
      {resource.date && (
        <div className="flex items-center gap-1 sm:gap-2">
          <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{format(parseISO(resource.date), "MMM d, yyyy")}</span>
        </div>
      )}
      <div className="flex items-center gap-1 sm:gap-2">
        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>{readingTime} min read</span>
      </div>
    </div>

    {/* Title */}
    <Link href={`/posts/${resource.slug}`}>
      <h3
        className={`font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 ${large ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}
      >
        {resource.title}
      </h3>
    </Link>

    {/* Description */}
    {resource.description && (
      <p
        className={`text-muted-foreground/90 line-clamp-2 sm:line-clamp-3 leading-relaxed ${large ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
      >
        {resource.description}
      </p>
    )}

    {/* Footer */}
    <div className="flex items-center justify-between pt-3 border-t border-border/40">
      <div className="flex items-center gap-2 sm:gap-3">
        {resource.author?.name ? (
          <Avatar name={resource.author.name} picture={typeof resource.author.picture === "object" && resource.author.picture !== null ? resource.author.picture : null} />
        ) : (
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
        )}
      </div>
      <Link href={`/posts/${resource.slug}`}>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          Read more →
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>

  );
};

export const ResourceCardSkeleton = ({
  large = false,
}: {
  large?: boolean;
}) => (
  <Card
    className={`overflow-hidden bg-card border-border ${large ? "md:col-span-2 lg:col-span-2" : "w-full h-full"}`}
  >
    <div
      className={`relative bg-muted animate-pulse ${large ? "h-64 md:h-80" : "h-24 sm:h-32"}`}
    />
    <CardContent className="p-3 sm:p-6 space-y-2 sm:space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        <div className="h-3 sm:h-4 w-24 bg-muted animate-pulse rounded" />
      </div>
      <div
        className={`h-5 sm:h-6 w-full bg-muted animate-pulse rounded ${large ? "h-7 sm:h-8" : ""}`}
      />
      <div
        className={`h-5 sm:h-6 w-3/4 bg-muted animate-pulse rounded ${large ? "h-7 sm:h-8" : ""}`}
      />
      <div className="h-3 sm:h-4 w-full bg-muted animate-pulse rounded" />
      <div className="h-3 sm:h-4 w-2/3 bg-muted animate-pulse rounded" />
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 sm:h-8 bg-muted animate-pulse rounded-full" />
          <div className="h-3 sm:h-4 w-20 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-3 sm:h-4 w-16 bg-muted animate-pulse rounded" />
      </div>
    </CardContent>
  </Card>
);
