// sanity/lib/queries.ts
import { defineQuery } from "next-sanity";

// Enhanced post fields with additional data
const postFields = /* groq */ `
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
`;

// Query to fetch all posts with pagination
export const allPostsQuery = defineQuery(`
  {
    "posts": *[_type == "post" && defined(slug.current)] 
      | order(date desc, _updatedAt desc) 
      [$offset...$offset + $limit] {
        ${postFields}
      },
    "total": count(*[_type == "post" && defined(slug.current)])
  }
`);

// Query for featured posts (large grid items)
export const featuredPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && featured == true] 
  | order(date desc, _updatedAt desc) [0...3] {
    ${postFields}
  }
`);

// Query for recent posts
export const recentPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] 
  | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

// Enhanced posts by category query with proper error handling
export const postsByCategoryQuery = defineQuery(`
  {
    "posts": *[_type == "post" && defined(slug.current) && category._ref == $categoryId] 
      | order(date desc) [$offset...$offset + $limit] {
        ${postFields}
      },
    "total": count(*[_type == "post" && defined(slug.current) && category._ref == $categoryId]),
    "category": *[_type == "category" && _id == $categoryId][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      "color": coalesce(color.hex, "#3B82F6"),
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      featured,
      "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
    }
  }
`);
// Query for posts by author
export const postsByAuthorQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && author->slug.current == $authorSlug] 
  | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

// Query for related posts
export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && _id != $postId && 
    (category->_id == $categoryId || author->_id == $authorId)] 
  | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

// export const categoriesQuery = groq`
//   *[_type == "category" && defined(slug.current)] | order(title asc) {
//     _id,
//     title,
//     slug,
//     description,
//     color,
//     image,
//     "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
//   }
// `;

// Search posts query
export const searchPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && 
    (title match $searchTerm + "*" || excerpt match $searchTerm + "*" || 
     pt::text(content) match $searchTerm + "*")] 
  | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

// Your existing queries (keeping them as reference)
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const heroPostsGridQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc)[0...5] {
    ${postFields}
  }
`);

export const tripleCardGridQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc)[1...4] {
    ${postFields}
  }
`);

// Trending posts query
export const trendingPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && isTrending == true] | order(date desc) [0...10] {
    ${postFields}
  }
`);

export const partnersQuery =
  defineQuery(`*[_type == "partner"] | order(_createdAt desc) {
  _id,
  title,
  "logo": logo.asset->url,
  website
}`);

export const categoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    image,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
  }
`);

export const categoryQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    "image": image.asset->url,
    seo
  }
`);

export const carouselPostsQuery =
  defineQuery(`*[_type == "carouselPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  slides[]{
    image{
      asset->{
        url
      },
      alt
    },
    caption,
    order
  },
  description,
  author->{
    name
  },
  publishedAt
}`);

// Categories with post counts for sidebar
export const sidebarCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] 
  | order(order asc, title asc) [0...8] {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    "image": image.asset->url,
    featured,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current) && status == "published"])
  }
`);

// Trending posts for marquee
export const trendingPostsMarqueeQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && isTrending == true && status == "published"] 
  | order(date desc) [0...10] {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "category": category->title,
    "date": coalesce(date, _updatedAt)
  }
`);

// Featured categories for sidebar
export const featuredCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current) && featured == true] 
  | order(order asc, title asc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current) && status == "published"])
  }
`);



// Posts with enhanced filtering
export const enhancedAllPostsQuery = defineQuery(`
  {
    "posts": *[_type == "post" && defined(slug.current) && status == "published"] 
      | order(date desc, _updatedAt desc) 
      [$offset...$offset + $limit] {
        ${postFields}
      },
    "total": count(*[_type == "post" && defined(slug.current) && status == "published"])
  }
`);
// Get all category slugs for static generation
export const allCategorySlugsQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] {
    "slug": slug.current
  }
`);

// Get category with recent posts preview
export const categoryWithRecentPostsQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    featured,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)]),
    "recentPosts": *[_type == "post" && references(^._id) && defined(slug.current)] 
      | order(date desc) [0...3] {
        ${postFields}
      }
  }
`);
// Enhanced category with posts query
export const categoryWithPostsQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
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
`);

// Query to get the active founder message
export const founderMessageQuery = defineQuery(`
  *[_type == "founderMessage" && isActive == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    founderName,
    founderTitle,
    founderImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip
        }
      },
      alt,
      hotspot,
      crop
    },
    message,
    featuredQuote {
      text,
      showQuote
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          url
        }
      }
    },
    publishedAt,
    isActive
  }
`);

// Query to get founder message by slug
export const founderMessageBySlugQuery = defineQuery(
  `
  *[_type == "founderMessage" && slug.current == $slug && isActive == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    founderName,
    founderTitle,
    founderImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip
        }
      },
      alt,
      hotspot,
      crop
    },
    message,
    featuredQuote {
      text,
      showQuote
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          url
        }
      }
    },
    publishedAt,
    isActive
  }
`
);

// TypeScript interfaces
export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip?: string;
    };
  };
  alt: string;
  hotspot?: {
    x: number;
    y: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface FounderMessage {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  founderName: string;
  founderTitle: string;
  founderImage: SanityImage;
  message: any[]; // Portable text blocks
  featuredQuote?: {
    text: string;
    showQuote: boolean;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: {
        url: string;
      };
    };
  };
  publishedAt: string;
  isActive: boolean;
}
