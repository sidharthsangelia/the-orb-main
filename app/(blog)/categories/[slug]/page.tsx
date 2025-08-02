// app/categories/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { 
  sidebarCategoriesQuery, 
  trendingPostsMarqueeQuery 
} from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/utils';
import { CTA } from '@/components/about/Cta';
import { PostsGrid } from '@/components/blog/PostsGrid';
import { PostsSidebar } from '@/components/blog/PostsSidebar';
import { Pagination } from '@/components/blog/Pagination';
import { EmptyState } from '@/components/blog/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, BookOpen, TrendingUp, Leaf, Search, X } from 'lucide-react';
import type { Post, Category, TrendingPost } from '@/types/post';

const POSTS_PER_PAGE = 12;

interface CategoryWithPosts extends Category {
  postCount: number;
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Fixed queries with proper GROQ syntax
const categoryWithPostsQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    image,
    featured,
    order,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)]),
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          url
        }
      }
    }
  }
`;

const postsByCategoryQuery = `
  {
    "posts": *[_type == "post" && defined(slug.current) && references($categoryId)] 
      | order(date desc, _updatedAt desc) 
      [$offset...$offset + $limit] {
        _id,
        "status": select(_originalId in path("drafts.**") => "draft", "published"),
        "title": coalesce(title, "Untitled"),
        "slug": slug.current,
        excerpt,
        coverImage,
        "date": coalesce(date, _updatedAt),
        "author": author->{
          "name": coalesce(name, "Anonymous"), 
          picture
        },
        "category": category->{
          title,
          "color": coalesce(color.hex, "#3B82F6")
        },
        "readingTime": round(length(pt::text(content)) / 5 / 180 )
      },
    "total": count(*[_type == "post" && defined(slug.current) && references($categoryId)])
  }
`;

export default function CategoryPage({ params }: CategoryPageProps) {
  const [categoryData, setCategoryData] = useState<CategoryWithPosts | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Fetch category and posts data
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // First get the category details
        const category = await client.fetch(categoryWithPostsQuery, { slug: params.slug });
        
        if (!category) {
          notFound();
          return;
        }

        setCategoryData(category);

        // Then get the posts for this category
        const offset = (currentPage - 1) * POSTS_PER_PAGE;
        const postsData = await client.fetch(postsByCategoryQuery, {
          categoryId: category._id,
          limit: POSTS_PER_PAGE,
          offset
        });

        setPosts(postsData.posts || []);
        setTotalPosts(postsData.total || 0);
      } catch (error) {
        console.error('Error fetching category data:', error);
        console.log('Category data received:');
        setPosts([]);
        setTotalPosts(0);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCategoryData();
    }
  }, [params.slug, currentPage]);

  // Fetch sidebar data
  useEffect(() => {
    const fetchSidebarData = async () => {
      setSidebarLoading(true);
      try {
        const [categoriesData, trendingData] = await Promise.all([
          client.fetch(sidebarCategoriesQuery),
          client.fetch(trendingPostsMarqueeQuery)
        ]);
        
        setCategories(
          (categoriesData || []).map(cat => ({
            ...cat,
            title: cat.title ?? '',
            slug: cat.slug ?? '',
            description: cat.description ?? '',
            image: cat.image && typeof cat.image === 'object'
              ? cat.image
              : {
                  asset: { _id: '', url: '' },
                  alt: ''
                },
            featured: cat.featured ?? false
          }))
        );
        setTrendingPosts(
          (trendingData || []).map(post => ({
            ...post,
            title: post.title ?? '',
            slug: post.slug ?? '',
            author: post.author ?? '',
            category: post.category ?? '',
            date: post.date ?? ''
          }))
        );
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    searchQuery === '' || 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !categoryData) {
    return <CategoryPageSkeleton />;
  }

  if (!categoryData) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-b border-border pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link 
              href="/posts" 
              className="hover:text-primary transition-colors flex items-center gap-1 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              All Posts
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground font-medium">{categoryData.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Category Info */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Badge 
                  className="text-sm px-4 py-2 border-0 font-medium"
                  style={{ 
                    backgroundColor: `${categoryData.color || '#3B82F6'}15`,
                    color: categoryData.color || '#3B82F6',
                    borderLeft: `4px solid ${categoryData.color || '#3B82F6'}`
                  }}
                >
                  {categoryData.title}
                </Badge>
                {categoryData.featured && (
                  <Badge className="bg-primary/10 text-primary border-0 px-3 py-1">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {categoryData.title}
                </h1>
                
                {categoryData.description && (
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {categoryData.description}
                  </p>
                )}
              </div>

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-4">
                <Card className="bg-card/60 backdrop-blur-sm border-border hover:bg-card/80 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${categoryData.color || '#3B82F6'}15` }}
                    >
                      <BookOpen className="h-6 w-6" style={{ color: categoryData.color || '#3B82F6' }} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">{categoryData.postCount}</p>
                      <p className="text-sm text-muted-foreground">Total Stories</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/60 backdrop-blur-sm border-border hover:bg-card/80 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">Climate</p>
                      <p className="text-sm text-muted-foreground">Focused</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Category Image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                {categoryData.image ? (
                  <>
                    <Image
                      src={urlForImage(categoryData.image)?.width(600).height(450).url() || ''}
                      alt={categoryData.image.alt || categoryData.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    {/* Debug: Log image data */}
                    {console.log('Category image data:', categoryData.image)}
                    {console.log('Generated URL:', urlForImage(categoryData.image)?.width(600).height(450).url())}
                  </>
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${categoryData.color || '#3B82F6'}20, ${categoryData.color || '#3B82F6'}05)`
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        style={{ backgroundColor: `${categoryData.color || '#3B82F6'}25` }}
                      >
                        <Leaf className="h-12 w-12" style={{ color: categoryData.color || '#3B82F6' }} />
                      </div>
                      <span 
                        className="text-xl font-semibold"
                        style={{ color: categoryData.color || '#3B82F6' }}
                      >
                        {categoryData.title}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Posts Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search Bar and Content Header */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {searchQuery ? 'Search Results' : `Latest Stories`}
                  </h2>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `${filteredPosts.length} stories found${searchQuery ? ` for "${searchQuery}"` : ''}`
                      : `${totalPosts} climate stories in ${categoryData.title}`
                    }
                  </p>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder={`Search in ${categoryData.title}...`}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-10 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 || loading ? (
              <>
                <PostsGrid 
                  posts={filteredPosts} 
                  loading={loading} 
                />
                
                {/* Pagination - only show when not searching and there are multiple pages */}
                {totalPages > 1 && searchQuery === '' && !loading && (
                  <div className="flex justify-center pt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="py-12">
                <EmptyState
                  title={searchQuery ? `No results for "${searchQuery}"` : `No stories in ${categoryData.title} yet`}
                  description={searchQuery 
                    ? "Try adjusting your search terms or explore other categories." 
                    : "Check back soon for new climate stories and insights in this category."
                  }
                  isSearchResult={!!searchQuery}
                  onClearSearch={searchQuery ? handleClearSearch : undefined}
                />
              </div>
            )}
          </div>

          {/* Sidebar - 1/4 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {sidebarLoading ? (
                <SidebarSkeleton />
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
      {!loading && posts.length > 0 && (
        <div className="border-t border-border">
          <CTA />
        </div>
      )}
    </div>
  );
}

// Loading skeleton for the category page
function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-b border-border pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="h-5 w-48 bg-muted animate-pulse rounded mb-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-7 w-24 bg-muted animate-pulse rounded" />
                <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              </div>
              
              <div className="space-y-4">
                <div className="h-12 md:h-16 w-full max-w-lg bg-muted animate-pulse rounded" />
                <div className="space-y-2">
                  <div className="h-6 w-full max-w-3xl bg-muted animate-pulse rounded" />
                  <div className="h-6 w-80 bg-muted animate-pulse rounded" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-20 w-36 bg-muted animate-pulse rounded-lg" />
                <div className="h-20 w-36 bg-muted animate-pulse rounded-lg" />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="aspect-[4/3] bg-muted animate-pulse rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-8 w-64 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="h-12 w-80 bg-muted animate-pulse rounded-xl" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
                        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      </div>
                      <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <SidebarSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar loading skeleton
function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
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
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
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
  );
}