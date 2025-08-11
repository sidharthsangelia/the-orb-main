'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, User, Leaf } from 'lucide-react';

interface Resource {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  date?: string;
  author?: { name: string; picture?: string };
  category?: { title: string; color?: { hex: string } };
  isFeatured?: boolean;
  status?: 'draft' | 'published';
  readTime?: number;
}

interface ResourceCardProps {
  resource: Resource;
  large?: boolean;
  className?: string;
}

export const ResourceCard = ({ resource, large = false, className = '' }: ResourceCardProps) => {
  const readingTime = resource.readTime || (resource.description ? Math.ceil(resource.description.length / 250) : 5);

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-500 bg-card border-border ${large ? 'md:col-span-2 lg:col-span-2' : ''} ${className}`}>
      <Link href={`/resources/${resource.slug}`} className="block">
        <div className={`relative overflow-hidden ${large ? 'h-64 md:h-80' : 'h-48'}`}>
          {resource.image ? (
            <Image
              src={resource.image}
              alt={resource.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <span className="text-primary text-sm font-medium">Resource</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {resource.category?.title && (
            <Badge 
              className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border-primary/20"
              style={{ 
                backgroundColor: `${resource.category.color?.hex || 'hsl(var(--primary))'}15`,
                color: resource.category.color?.hex || 'hsl(var(--primary))',
                borderLeft: `3px solid ${resource.category.color?.hex || 'hsl(var(--primary))'}`
              }}
            >
              {resource.category.title}
            </Badge>
          )}
          {resource.isFeatured && (
            <Badge className="absolute top-4 right-4 bg-orange-500/90 text-white border-0 animate-pulse">
              🔥 Featured
            </Badge>
          )}
          {resource.status === 'draft' && (
            <Badge className="absolute top-4 right-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground border-0">
              Draft
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {resource.date && (
              <>
                <CalendarDays className="h-4 w-4" />
                <time dateTime={resource.date}>
                  {new Date(resource.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        <Link href={`/resources/${resource.slug}`}>
          <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight ${large ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {resource.title}
          </h3>
        </Link>
        {resource.description && (
          <p className={`text-muted-foreground mb-4 line-clamp-3 leading-relaxed ${large ? 'text-base' : 'text-sm'}`}>
            {resource.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {resource.author?.picture ? (
              <Image
                src={resource.author.picture}
                alt={resource.author.name}
                width={32}
                height={32}
                className="rounded-full ring-2 ring-border"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
            <span className="text-sm text-foreground font-medium">
              {resource.author?.name || 'Anonymous'}
            </span>
          </div>
          <Link href={`/resources/${resource.slug}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
              Read more →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export const ResourceCardSkeleton = ({ large = false }: { large?: boolean }) => (
  <Card className={`overflow-hidden bg-card border-border ${large ? 'md:col-span-2 lg:col-span-2' : ''}`}>
    <div className={`relative bg-muted animate-pulse ${large ? 'h-64 md:h-80' : 'h-48'}`} />
    <CardContent className="p-6 space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-5 w-16 bg-muted animate-pulse rounded" />
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
      </div>
      <div className={`h-6 w-full bg-muted animate-pulse rounded ${large ? 'h-8' : ''}`} />
      <div className={`h-6 w-3/4 bg-muted animate-pulse rounded ${large ? 'h-8' : ''}`} />
      <div className="h-4 w-full bg-muted animate-pulse rounded" />
      <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
          <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
      </div>
    </CardContent>
  </Card>
);