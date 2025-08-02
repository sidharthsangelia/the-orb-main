// components/blog/SearchHeader.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Target, X } from 'lucide-react';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPosts: number;
  loading?: boolean;
}

export const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  totalPosts, 
  loading = false 
}: SearchHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-6">
            <Target className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            Climate Stories & Insights
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Empowering India's youth with{' '}
            <span className="text-primary font-semibold">authentic stories</span> and{' '}
            <span className="text-secondary font-semibold">actionable knowledge</span> to drive sustainable change 
            in our evolving green economy.
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search climate stories, initiatives, authors..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-12 py-4 w-full border-border focus:border-primary/50 focus:ring-primary/20 bg-background/80 backdrop-blur-sm text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Press Enter to search or clear to see all stories
              </p>
            )}
          </div>
          
          {/* Stats Display */}
          {!loading && totalPosts > 0 && (
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm text-primary px-6 py-3 rounded-full text-sm font-medium border border-primary/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="font-bold">{totalPosts.toLocaleString()}</span>
                <span>{totalPosts === 1 ? 'story' : 'stories'}</span>
              </div>
              <div className="w-px h-4 bg-primary/30"></div>
              <span className="text-primary/80">driving climate action</span>
            </div>
          )}
          
          {searchQuery && (
            <div className="mt-4 inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm">
              <Search className="h-4 w-4" />
              <span>Searching for: "{searchQuery}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};