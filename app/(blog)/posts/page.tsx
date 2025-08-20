// app/posts/page.tsx - Enhanced with sidebar layout
'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { allPostsQuery, sidebarCategoriesQuery, trendingPostsMarqueeQuery } from '@/sanity/lib/queries';
import { CTA } from '@/components/about/Cta';
import { PostsHeader } from '@/components/blog/PostHeader';
import { PostsGrid } from '@/components/blog/PostsGrid';
import { PostsSidebar } from '@/components/blog/PostsSidebar';
import { Pagination } from '@/components/blog/Pagination';
import { EmptyState } from '@/components/blog/EmptyState';
import type { Post, PostsData, Category, TrendingPost } from '@/types/post';
import { SearchResults } from '@/components/blog/SearchResult';

const POSTS_PER_PAGE = 12;

// Helper function to safely transform posts data to match Post interface
const transformPostsData = (rawData: any[]): Post[] => {
  if (!rawData || !Array.isArray(rawData)) {
    return [];
  }

  return rawData
    .filter((post: any) => post && post.slug && typeof post.slug === 'string')
    .map((post: any) => ({
      _id: post._id || '',
      title: post.title || 'Untitled',
      slug: post.slug as string,
      excerpt: post.excerpt || undefined,
      coverImage: post.coverImage || undefined,
      date: post.date || '',
      author: {
        name: post.author?.name || 'Anonymous',
        picture: post.author?.picture || undefined
      },
      category: post.category ? {
        title: post.category.title || 'Uncategorized',
        color: post.category.color || '#000000'
      } : undefined,
      readingTime: post.readingTime || post.readTime || undefined,
      status: post.status || undefined
    }));
};

// Helper function to safely transform categories data
const transformCategoriesData = (rawData: any[]): Category[] => {
  if (!rawData || !Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((cat: any) => ({
    _id: cat._id || '',
    title: cat.title || '',
    slug: cat.slug || '',
    description: cat.description || undefined,
    color: cat.color || '#000000',
    image: cat.image && typeof cat.image === 'object' ? {
      asset: {
        _id: cat.image.asset?._id || '',
        url: cat.image.asset?.url || ''
      },
      alt: cat.image.alt || undefined
    } : undefined,
    postCount: cat.postCount || 0,
    featured: cat.featured || false,
    order: cat.order || undefined
  }));
};

// Helper function to safely transform trending posts data
const transformTrendingPostsData = (rawData: any[]): TrendingPost[] => {
  if (!rawData || !Array.isArray(rawData)) {
    return [];
  }

  return rawData
    .filter((post: any) => post && post.slug && typeof post.slug === 'string')
    .map((post: any) => ({
      _id: post._id || '',
      title: post.title || '',
      slug: post.slug as string,
      author: post.author || '',
      category: post.category || '',
      date: post.date || ''
    }));
};

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Fetch sidebar data (categories and trending posts)
  useEffect(() => {
    const fetchSidebarData = async () => {
      setSidebarLoading(true);
      try {
        const [categoriesData, trendingData] = await Promise.all([
          client.fetch(sidebarCategoriesQuery),
          client.fetch(trendingPostsMarqueeQuery)
        ]);
        
        setCategories(transformCategoriesData(categoriesData || []));
        setTrendingPosts(transformTrendingPostsData(trendingData || []));
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
        setCategories([]);
        setTrendingPosts([]);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  // Fetch posts data
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * POSTS_PER_PAGE;
        const rawData: any = await client.fetch(allPostsQuery, { 
          limit: POSTS_PER_PAGE, 
          offset 
        });
        
        // Transform the raw data to match our PostsData type
        const transformedPosts = transformPostsData(rawData.posts || []);
        const total = rawData.total || 0;
        
        setPosts(transformedPosts);
        setTotalPosts(total);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setTotalPosts(0);
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter posts based on search query with safe property access
  const filteredPosts = posts.filter(post => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    const title = post.title?.toLowerCase() || '';
    const excerpt = post.excerpt?.toLowerCase() || '';
    const authorName = post.author?.name?.toLowerCase() || '';
    const categoryTitle = post.category?.title?.toLowerCase() || '';
    
    return title.includes(query) ||
           excerpt.includes(query) ||
           authorName.includes(query) ||
           categoryTitle.includes(query);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <PostsHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalPosts={totalPosts}
        loading={loading}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Posts Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-8">
            {filteredPosts.length > 0 || loading ? (
              <>
                <PostsGrid 
                  posts={filteredPosts} 
                  loading={loading} 
                />
                
                {/* Pagination */}
                {totalPages > 1 && searchQuery === '' && !loading && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
                
                {/* Search Results */}
                <SearchResults
                  searchQuery={searchQuery}
                  filteredCount={filteredPosts.length}
                  totalCount={totalPosts}
                  onClearSearch={handleClearSearch}
                />
              </>
            ) : (
              <EmptyState
                title={searchQuery ? `No results for "${searchQuery}"` : "No stories found"}
                description={searchQuery ? "Try adjusting your search terms or explore all climate stories." : "Check back for new climate insights and youth-driven initiatives."}
                isSearchResult={!!searchQuery}
                onClearSearch={searchQuery ? handleClearSearch : undefined}
              />
            )}
          </div>

          {/* Sidebar - 1/4 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {sidebarLoading ? (
                <div className="space-y-8">
                  {/* Categories Loading Skeleton */}
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
                    <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3">
                          <div className="w-12 h-12 bg-muted animate-pulse rounded-lg" />
                          <div className="flex-1">
                            <div className="h-4 w-20 bg-muted animate-pulse rounded mb-2" />
                            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Trending Loading Skeleton */}
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
                    <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-3">
                          <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
                          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <PostsSidebar 
                  categories={categories}
                  trendingPosts={trendingPosts}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA Section */}
      {!loading && posts.length > 0 && <CTA />}
    </div>
  );
}