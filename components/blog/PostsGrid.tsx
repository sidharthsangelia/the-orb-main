// components/posts/PostsGrid.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, User, Leaf } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/utils';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author: {
    name: string;
    picture?: any;
  };
  category?: {
    title: string;
    color: string;
  };
  readingTime?: number;
  status?: string;
}

interface PostsGridProps {
  posts: Post[];
  loading?: boolean;
}

const PostCardSkeleton = ({ large = false }: { large?: boolean }) => (
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

const PostCard = ({ post, large = false }: { post: Post; large?: boolean }) => {
  const readingTime = post.readingTime || Math.ceil((post.excerpt?.length || 0) / 250) || 5;
  
  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-500 bg-card border-border ${
      large ? 'md:col-span-2 lg:col-span-2' : ''
    }`}>
      <Link href={`/posts/${post.slug}`} className="block">
        <div className={`relative overflow-hidden ${large ? 'h-64 md:h-80' : 'h-48'}`}>
          {post.coverImage ? (
            <Image
              src={urlForImage(post.coverImage)?.width(800).height(400).url() || ''}
              alt={post.title}
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
                <span className="text-primary text-sm font-medium">Climate Story</span>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {post.category && (
            <Badge 
              className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border-primary/20"
              style={{ 
                backgroundColor: `hsl(${post.category.color || 'var(--primary)'} / 0.15)`,
                color: `hsl(${post.category.color || 'var(--primary)'})`,
                borderLeft: `3px solid hsl(${post.category.color || 'var(--primary)'})`
              }}
            >
              {post.category.title}
            </Badge>
          )}
          
          {post.status === 'draft' && (
            <Badge className="absolute top-4 right-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground border-0">
              Draft
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        
        <Link href={`/posts/${post.slug}`}>
          <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight ${
            large ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>
        </Link>
        
        {post.excerpt && (
          <p className={`text-muted-foreground mb-4 line-clamp-3 leading-relaxed ${large ? 'text-base' : 'text-sm'}`}>
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.author.picture ? (
              <Image
                src={urlForImage(post.author.picture)?.width(32).height(32).url() || ''}
                alt={post.author.name}
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
              {post.author.name}
            </span>
          </div>
          
          <Link href={`/posts/${post.slug}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
              Read more →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export function PostsGrid({ posts, loading = false }: PostsGridProps) {
  const getGridLayout = (index: number) => {
    // First post is large
    if (index === 0) return 'large';
    
    // Every 7th post after the first is large (index 7, 14, 21...)
    if ((index - 1) % 7 === 6) return 'large';
    
    return 'normal';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {[...Array(6)].map((_, index) => (
          <PostCardSkeleton 
            key={index} 
            large={getGridLayout(index) === 'large'} 
          />
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="col-span-full">
        {/* Empty state will be handled by parent component */}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {posts.map((post, index) => (
        <PostCard
          key={post._id}
          post={post}
          large={getGridLayout(index) === 'large'}
        />
      ))}
    </div>
  );
}