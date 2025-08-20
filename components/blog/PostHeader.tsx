// components/posts/PostsHeader.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Target } from 'lucide-react';

interface PostsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPosts: number;
  loading?: boolean;
}

export function PostsHeader({ 
  searchQuery, 
  onSearchChange, 
  totalPosts, 
  loading = false 
}: PostsHeaderProps) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Target className="h-8 w-8 text-primary" />
          </div> */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-12 mb-6">
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
                onChange={(e) => onSearchChange(e.target.value)}
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
  );
}