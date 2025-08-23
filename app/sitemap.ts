import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";

const BASE_URL = "https://theorbearth.in";

// === GROQ Queries ===
const sitemapPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    date,
    _id
  } | order(date desc, _updatedAt desc)
`);

const allCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
  }
`);

// === Static Pages ===
const staticPages: {
  url: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { url: "", changeFrequency: "daily", priority: 1 },
  { url: "/about", changeFrequency: "monthly", priority: 0.8 },
  { url: "/community", changeFrequency: "monthly", priority: 0.8 },
  { url: "/posts", changeFrequency: "daily", priority: 0.9 },
  { url: "/resources", changeFrequency: "daily", priority: 0.7 },
  { url: "/founder/message", changeFrequency: "yearly", priority: 0.6 },
];

// === Sitemap Function ===
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic content
  const posts = await sanityFetch({ query: sitemapPostsQuery, stega: false });
  const categories = await sanityFetch({ query: allCategoriesQuery, stega: false });

  // Static URLs
  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: normalizeUrl(`${BASE_URL}${page.url}`),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Post URLs (filter first, then map)
  const postUrls: MetadataRoute.Sitemap = posts
    ?.filter((post: any) => !!post.slug)
    .map((post: any) => ({
      url: normalizeUrl(`${BASE_URL}/posts/${post.slug}`),
      lastModified: post._updatedAt
        ? new Date(post._updatedAt)
        : post.date
        ? new Date(post.date)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })) || [];

  // Category URLs
  const categoryUrls: MetadataRoute.Sitemap = categories
    ?.filter((category: any) => !!category.slug)
    .map((category: any) => ({
      url: normalizeUrl(`${BASE_URL}/categories/${category.slug}`),
      lastModified: category._updatedAt ? new Date(category._updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: category.postCount > 0 ? 0.8 : 0.6,
    })) || [];

  return [...staticUrls, ...categoryUrls, ...postUrls];
}

// === Helper: Normalize URLs (adds trailing slash for consistency) ===
function normalizeUrl(url: string): string {
  if (url.endsWith("/")) return url;
  return url + "/";
}
