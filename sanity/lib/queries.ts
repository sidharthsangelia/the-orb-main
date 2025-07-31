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

// Query for posts by category
export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && category->slug.current == $categorySlug] 
  | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
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

export const partnersQuery = defineQuery(`*[_type == "partner"] | order(_createdAt desc) {
  _id,
  title,
  "logo": logo.asset->url,
  website
}`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    "image": image.asset->url,
    "postCount": count(*[_type == "post" && references(^._id)])
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