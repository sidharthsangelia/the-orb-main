// app/posts/page.tsx - Climate-focused with dark/light mode
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
 
import { allPostsQuery } from '@/sanity/lib/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, Clock, User, ChevronLeft, ChevronRight, Search, Leaf, Target, Users } from 'lucide-react';
import type { Post, PostsData } from '@/types/blog';
import { urlForImage } from '@/sanity/lib/utils';
import { CTA } from '@/components/about/Cta';

const POSTS_PER_PAGE = 15;

// Enhanced loading skeleton with theme support
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

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={index} className="px-3 py-2 text-muted-foreground">...</span>
          ) : (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={`min-w-[40px] ${
                currentPage === page 
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                  : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
              }`}
            >
              {page}
            </Button>
          )
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const EmptyState = ({ 
  title = "No stories found", 
  description = "Check back for new climate insights and youth-driven initiatives.",
  showHomeButton = true 
}: {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}) => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <Leaf className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      {showHomeButton && (
        <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      )}
    </div>
  );
};

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * POSTS_PER_PAGE;
        const data: PostsData = await client.fetch(allPostsQuery, { 
          limit: POSTS_PER_PAGE, 
          offset 
        });
        
        setPosts(data.posts);
        setTotalPosts(data.total);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGridLayout = (index: number) => {
    // First post is large
    if (index === 0) return 'large';
    
    // Every 7th post after the first is large (index 7, 14, 21...)
    if ((index - 1) % 7 === 6) return 'large';
    
    return 'normal';
  };

  const filteredPosts = posts.filter(post =>
    searchQuery === '' || 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Climate-focused messaging */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Climate Stories & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Empowering India's youth with <span className="text-primary font-semibold">authentic stories</span> and 
              <span className="text-secondary font-semibold"> actionable knowledge</span> to drive sustainable change 
              in our evolving green economy.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search climate stories, initiatives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-border focus:border-primary/50 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>
            
            {!loading && totalPosts > 0 && (
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                {totalPosts} {totalPosts === 1 ? 'story' : 'stories'} driving climate action
              </div>
            )}
          </div>
        </div>
      </div>

     

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(POSTS_PER_PAGE)].map((_, index) => (
              <PostCardSkeleton 
                key={index} 
                large={getGridLayout(index) === 'large'} 
              />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  large={getGridLayout(index) === 'large'}
                />
              ))}
            </div>
            
            {totalPages > 1 && searchQuery === '' && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            
            {searchQuery !== '' && (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  Showing {filteredPosts.length} of {totalPosts} stories for "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 border-primary/30 hover:bg-primary/10"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState 
            title={searchQuery ? `No results for "${searchQuery}"` : "No stories found"}
            description={searchQuery ? "Try adjusting your search terms or explore all climate stories." : "Check back for new climate insights and youth-driven initiatives."}
          />
        )}
      </div>
      
      {/* Bottom CTA Section - Mission focused */}
      {!loading && posts.length > 0 && (
        
        <CTA/>
      )}
    </div>
  );
}