// app/categories/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  sidebarCategoriesQuery,
  trendingPostsMarqueeQuery,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { CTA } from "@/components/about/Cta";
import { PostsGrid } from "@/components/blog/PostsGrid";
import { PostsSidebar } from "@/components/blog/PostsSidebar";
import { Pagination } from "@/components/blog/Pagination";
import { EmptyState } from "@/components/blog/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  TrendingUp,
  Leaf,
  Search,
  X,
} from "lucide-react";
import type { Post, Category, TrendingPost } from "@/types/post";
import { TrendingPostsMarquee } from "@/components/blog/TrendingPostMarquee";
import NewsletterArticleCard from "@/components/NewsLetterArticleCard";

const POSTS_PER_PAGE = 12;

interface CategoryWithPosts extends Category {
  postCount: number;
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
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
  const [slug, setSlug] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryWithPosts | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [paramsLoading, setParamsLoading] = useState(true);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Handle async params in client component
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setSlug(resolvedParams.slug);
      } catch (error) {
        console.error('Error resolving params:', error);
        notFound();
      } finally {
        setParamsLoading(false);
      }
    };
    
    resolveParams();
  }, [params]);

  // Fetch category and posts data
  useEffect(() => {
    if (!slug || paramsLoading) return;

    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // First get the category details
        const category = await client.fetch(categoryWithPostsQuery, { slug });

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
          offset,
        });

        setPosts(postsData.posts || []);
        setTotalPosts(postsData.total || 0);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setPosts([]);
        setTotalPosts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug, currentPage, paramsLoading]);

  // Fetch sidebar data
  useEffect(() => {
    const fetchSidebarData = async () => {
      setSidebarLoading(true);
      try {
        const [categoriesData, trendingData] = await Promise.all([
          client.fetch(sidebarCategoriesQuery),
          client.fetch(trendingPostsMarqueeQuery),
        ]);

        setCategories(
          (categoriesData || []).map((cat: any) => ({
            ...cat,
            title: cat.title ?? "",
            slug: cat.slug ?? "",
            description: cat.description ?? "",
            image:
              cat.image && typeof cat.image === "object"
                ? cat.image
                : {
                    asset: { _id: "", url: "" },
                    alt: "",
                  },
            featured: cat.featured ?? false,
          }))
        );
        setTrendingPosts(
          (trendingData || []).map((post: any) => ({
            ...post,
            title: post.title ?? "",
            slug: post.slug ?? "",
            author: post.author ?? "",
            category: post.category ?? "",
            date: post.date ?? "",
          }))
        );
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading while resolving params or initial loading
  if (paramsLoading || (loading && !categoryData)) {
    return <CategoryPageSkeleton />;
  }

  if (!categoryData) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-b border-border pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 mb-6 sm:mb-8">
            <Link
              href="/posts"
              className="hover:text-primary transition-colors flex items-center gap-1 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden xs:inline">All Posts</span>
              <span className="xs:hidden">Posts</span>
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground font-medium truncate">
              {categoryData.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
            {/* Category Info */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Badge
                  className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 border-0 font-medium"
                  style={{
                    backgroundColor: `${categoryData.color || "#3B82F6"}15`,
                    color: categoryData.color || "#3B82F6",
                    borderLeft: `4px solid ${categoryData.color || "#3B82F6"}`,
                  }}
                >
                  {categoryData.title}
                </Badge>
                {categoryData.featured && (
                  <Badge className="bg-primary/10 text-primary border-0 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {categoryData.title}
                </h1>

                {categoryData.description && (
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {categoryData.description}
                  </p>
                )}
              </div>

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Card className="bg-card/60 backdrop-blur-sm border-border hover:bg-card/80 transition-colors">
                  <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${categoryData.color || "#3B82F6"}15`,
                      }}
                    >
                      <BookOpen
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        style={{ color: categoryData.color || "#3B82F6" }}
                      />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        {categoryData.postCount}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Total Stories
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/60 backdrop-blur-sm border-border hover:bg-card/80 transition-colors">
                  <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        Climate
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Focused</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Category Image */}
            <div className="lg:col-span-2 order-first lg:order-last">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
                {categoryData.image ? (
                  <Image
                    src={
                      urlForImage(categoryData.image)
                        ?.width(600)
                        .height(450)
                        .url() || ""
                    }
                    alt={categoryData.image.alt || categoryData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${categoryData.color || "#3B82F6"}20, ${categoryData.color || "#3B82F6"}05)`,
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        style={{
                          backgroundColor: `${categoryData.color || "#3B82F6"}25`,
                        }}
                      >
                        <Leaf
                          className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                          style={{ color: categoryData.color || "#3B82F6" }}
                        />
                      </div>
                      <span
                        className="text-lg sm:text-xl font-semibold"
                        style={{ color: categoryData.color || "#3B82F6" }}
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

      {/* Mobile-only Categories Filter Bar */}
      <div className="lg:hidden border-b border-border bg-background/95 backdrop-blur-sm sticky  top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Browse Categories
              </h3>
              {/* <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v18m9-9H3"
                  />
                </svg>
                More
              </button> */}
            </div>

            {/* Horizontal scrollable categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-10 pb-2">
              {!sidebarLoading &&
                categories.slice(0, 8).map((category) => (
                  <a
                    key={category._id}
                    href={`/categories/${category.slug}`}
                    className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                      categoryData.slug === category.slug
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{
                      backgroundColor:
                        categoryData.slug === category.slug
                          ? category.color
                          : `${category.color}15`,
                      color:
                        categoryData.slug === category.slug
                          ? "#ffffff"
                          : category.color,
                    }}
                  >
                    {category.title}
                    {category.postCount > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        ({category.postCount})
                      </span>
                    )}
                  </a>
                ))}
              {sidebarLoading &&
                [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-16 sm:w-20 h-6 sm:h-8 bg-muted animate-pulse rounded-full"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Trending Posts Banner */}
      {/* {!sidebarLoading && trendingPosts.length > 0 && (
        <div className="lg:hidden">
          <TrendingPostsMarquee posts={trendingPosts} title="Trending Now" />
        </div>
      )} */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Posts Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Search Bar and Content Header */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-4 items-start justify-between">
                <div className="space-y-1 w-full">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {searchQuery ? "Search Results" : `Latest Stories`}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {searchQuery
                      ? `${filteredPosts.length} stories found${searchQuery ? ` for "${searchQuery}"` : ""}`
                      : `${totalPosts} climate stories in ${categoryData.title}`}
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <input
                  type="text"
                  placeholder={`Search in ${categoryData.title}...`}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-3 pl-11 sm:pl-12 pr-10 bg-card border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm text-sm sm:text-base"
                />
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
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
                <PostsGrid posts={filteredPosts} loading={loading} />

                {/* Pagination - only show when not searching and there are multiple pages */}
                {totalPages > 1 && searchQuery === "" && !loading && (
                  <div className="flex justify-center pt-6 sm:pt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 sm:py-12">
                <EmptyState
                  title={
                    searchQuery
                      ? `No results for "${searchQuery}"`
                      : `No stories in ${categoryData.title} yet`
                  }
                  description={
                    searchQuery
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
          <div className="lg:col-span-1 order-first lg:order-last hidden lg:block">
            <div className="lg:sticky lg:top-8">
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
          <NewsletterArticleCard/>
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
      <div className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-b border-border pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="h-4 sm:h-5 w-32 sm:w-48 bg-muted animate-pulse rounded mb-6 sm:mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-6 sm:h-7 w-20 sm:w-24 bg-muted animate-pulse rounded" />
                <div className="h-5 sm:h-6 w-16 sm:w-20 bg-muted animate-pulse rounded" />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="h-8 sm:h-10 md:h-12 lg:h-16 w-full max-w-md sm:max-w-lg bg-muted animate-pulse rounded" />
                <div className="space-y-2">
                  <div className="h-5 sm:h-6 w-full max-w-2xl sm:max-w-3xl bg-muted animate-pulse rounded" />
                  <div className="h-5 sm:h-6 w-64 sm:w-80 bg-muted animate-pulse rounded" />
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="h-16 sm:h-20 w-28 sm:w-36 bg-muted animate-pulse rounded-lg" />
                <div className="h-16 sm:h-20 w-28 sm:w-36 bg-muted animate-pulse rounded-lg" />
              </div>
            </div>

            <div className="lg:col-span-2 order-first lg:order-last">
              <div className="aspect-[16/10] sm:aspect-[4/3] bg-muted animate-pulse rounded-xl sm:rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 sm:h-8 w-48 sm:w-64 bg-muted animate-pulse rounded" />
                  <div className="h-4 sm:h-5 w-32 sm:w-48 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="h-10 sm:h-12 w-full sm:w-80 bg-muted animate-pulse rounded-lg sm:rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <div className="h-40 sm:h-48 bg-muted animate-pulse" />
                  <div className="p-4 sm:p-6 space-y-3">
                    <div className="h-3 sm:h-4 w-20 sm:w-24 bg-muted animate-pulse rounded" />
                    <div className="h-5 sm:h-6 w-full bg-muted animate-pulse rounded" />
                    <div className="h-3 sm:h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-3 sm:h-4 w-3/4 bg-muted animate-pulse rounded" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 sm:h-8 w-6 sm:w-8 bg-muted animate-pulse rounded-full" />
                        <div className="h-3 sm:h-4 w-16 sm:w-20 bg-muted animate-pulse rounded" />
                      </div>
                      <div className="h-6 sm:h-8 w-20 sm:w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 order-first lg:order-last">
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
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
        <div className="h-5 sm:h-6 w-24 sm:w-32 bg-muted animate-pulse rounded mb-3 sm:mb-4" />
        <div className="space-y-2 sm:space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted animate-pulse rounded-lg" />
              <div className="flex-1">
                <div className="h-3 sm:h-4 w-16 sm:w-20 bg-muted animate-pulse rounded mb-1 sm:mb-2" />
                <div className="h-2 sm:h-3 w-12 sm:w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
        <div className="h-5 sm:h-6 w-24 sm:w-32 bg-muted animate-pulse rounded mb-3 sm:mb-4" />
        <div className="space-y-2 sm:space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-2 sm:p-3">
              <div className="h-3 sm:h-4 w-full bg-muted animate-pulse rounded mb-1 sm:mb-2" />
              <div className="h-2 sm:h-3 w-20 sm:w-24 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}