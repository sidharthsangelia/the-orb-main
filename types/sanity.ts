// =======================
// TYPESCRIPT TYPES & INTERFACES
// =======================
// types/sanity.ts - Add this to your Next.js project

import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Base Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Image interfaces
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// SEO interface
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  keywords?: string[];
}

// Author interface
export interface Author extends SanityDocument {
  _type: 'author';
  name: string;
  slug: {
    current: string;
  };
  picture: SanityImage;
  bio?: string;
  role?: string;
  social?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  email?: string;
  featured: boolean;
}

// Category interface
export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: {
    hex: string;
  };
  image?: SanityImage;
  seo?: SEO;
}

// Block content interface
export interface BlockContent {
  _type: 'block';
  _key: string;
  style: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
}

// Post interface
export interface Post extends SanityDocument {
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  content: BlockContent[];
  excerpt?: string;
  coverImage: SanityImage;
  categories: Category[];
  tags?: string[];
  date: string;
  author: Author;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  readingTime: number;
  relatedPosts?: Post[];
  seo?: SEO;
}

// Carousel slide interface
export interface CarouselSlide {
  _key: string;
  image: SanityImage;
  caption?: string;
  order?: number;
}

// Carousel post interface
export interface CarouselPost extends SanityDocument {
  _type: 'carouselPost';
  title: string;
  slug: {
    current: string;
  };
  slides: CarouselSlide[];
  description?: string;
  categories?: Category[];
  tags?: string[];
  author: Author;
  publishedAt: string;
  platforms?: ('instagram' | 'linkedin' | 'twitter' | 'facebook')[];
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  featured: boolean;
  seo?: SEO;
}

// Site settings interface
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  title: string;
  description: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  url?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  analytics?: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
  };
  seo?: SEO;
}

// Image optimization options
export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'jpeg' | 'png';
  fit?: 'crop' | 'fill' | 'max' | 'min' | 'scale';
  auto?: 'format';
}

// Responsive image URLs
export interface ResponsiveImageUrls {
  src: string;
  srcSet: string;
  sizes: string;
}

// Image with fallback
export interface ImageWithFallback {
  webp: string;
  fallback: string;
}

// ==================