// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsQuery } from "@/sanity/lib/queries";
import { defineQuery } from 'next-sanity';

// Your website base URL - update this to your actual domain
const BASE_URL = 'https://theorbearth.in'


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
  // Add more static pages as needed
  {
    url: '/founder/message',
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all posts from Sanity
  const { posts } = await sanityFetch({
    query: allPostsQuery,
    stega: false, // Important: no stega for sitemap
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
  const postUrls: MetadataRoute.Sitemap = posts?.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) || []

  // Generate category URLs
  const categoryUrls: MetadataRoute.Sitemap = categories?.map((category: any) => ({
    url: `${BASE_URL}/categories/${category.slug}`,
    lastModified: new Date(category._updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: category.postCount > 0 ? 0.8 : 0.6, // Higher priority for categories with posts
  })) || []

  return [
    ...staticUrls,
    ...categoryUrls,
    ...postUrls,
  ]
}