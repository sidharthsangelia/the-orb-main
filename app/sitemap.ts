// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { sanityFetch } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";

// Your website base URL - update this to your actual domain
const BASE_URL = 'https://theorbearth.in'

// Query to fetch all posts for sitemap (simplified)
const sitemapPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    date,
    _id
  } | order(date desc, _updatedAt desc)
`);

// Query to fetch all categories for sitemap
const allCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
  }
`)

// Static pages with their priorities and change frequencies
const staticPages = [
  {
    url: '',
    changeFrequency: 'daily' as const,
    priority: 1,
  },
  {
    url: '/about',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/community',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/posts',
    changeFrequency: 'daily' as const,
    priority: 0.9,
  },
  {
    url: '/resources',
    changeFrequency: 'daily' as const,
    priority: 0.7,
  },
  {
    url: '/founder/message',
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  },

  // Add more static pages as needed

]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Option A: Use dedicated sitemap query (recommended)
  const posts = await sanityFetch({
    query: sitemapPostsQuery,
    stega: false,
  });


  // Fetch all categories from Sanity
  const categories = await sanityFetch({
    query: allCategoriesQuery,
    stega: false,
  });

  // Generate static pages
  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Generate dynamic post URLs
  const postUrls: MetadataRoute.Sitemap = posts?.map((post: any) => {
    // Debug what we're getting
    console.log('Post data:', { slug: post.slug, slugCurrent: post.slug?.current, fullPost: post });
    
    // Handle different slug structures
    const slug = post.slug || post.slug?.current;
    
    if (!slug) {
      console.warn('Post without slug found:', post);
      return null;
    }
    
    return {
      url: `${BASE_URL}/posts/${slug}`,
      lastModified: new Date(post._updatedAt || post.date || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  }).filter(Boolean) || [] // Remove null entries

  // Generate category URLs
  const categoryUrls: MetadataRoute.Sitemap = categories?.map((category: any) => ({
    url: `${BASE_URL}/categories/${category.slug}`,
    lastModified: new Date(category._updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: category.postCount > 0 ? 0.8 : 0.6,
  })).filter((category: any) => category.url && !category.url.includes('undefined')) || []

  return [
    ...staticUrls,
    ...categoryUrls,
    ...postUrls,
  ]
}