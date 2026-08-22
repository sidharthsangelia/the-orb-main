// sanity/lib/queries.ts
import { defineQuery } from "next-sanity";

// Enhanced post fields with additional data
// queries.ts

// Guides & Handbooks
// sanity/lib/queries.ts


// Guides & Handbooks
export const guidesQuery = defineQuery(
  `
*["guides" in categories[]->slug.current && status == "published"]{
  _id,
  title,
  "slug": slug.current,
  "description": coalesce(excerpt, ""),
  "image": coverImage.asset->url,
  "type": type,
  "downloadCount": downloadCount,
  "category": categories[0]->title,
   author-> {
      name,
      picture
    },
}
`
)
;

// Educational Content
export const educationQuery = defineQuery(
  `
*[_type == "post" && "education" in categories[]->slug.current && status == "published"]{
  _id,
  title,
  "slug": slug.current,
  "description": coalesce(excerpt, ""),
  "image": coverImage.asset->url,
  "type": type,
  "duration": duration,
  "level": level,
  author-> {
      name,
      picture
    },
}
`

)
;

// Climate Stories
export const climateStoriesQuery = defineQuery(
  `
*[_type == "post" && "climate-stories" in categories[]->slug.current && status == "published"]{
  _id,
  title,
  "slug": slug.current,
  "description": coalesce(excerpt, ""),
  "image": coverImage.asset->url,
  organization,
  impact,
  readTime,
  date,
  author-> {
      name,
      picture
    },
}
`
)
;

// Youth Voices
export const youthVoicesQuery = defineQuery(
  `
*[_type == "post" && "youth-voices" in categories[]->slug.current && status == "published"]{
  _id,
  title,
  "slug": slug.current,
  "description": coalesce(excerpt, ""),
  "image": coverImage.asset->url,
  "author": author->name,
  readTime,
  likes,
  date,
  location,
  author-> {
      name,
      picture
    },
}
`
)
;

// ... rest of the file unchanged, including resourceDetailQuery ...

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
    picture,
    bio
  },
  // The schema field is "categories", an array of references. The previous
  // projection dereferenced "category->", a field that does not exist, so
  // every category badge on the site was silently fed null. "category" keeps
  // the singular shape the existing cards read; "categories" exposes the
  // full list for the article page.
  "category": categories[0]->{
    title,
    "slug": slug.current,
    "color": coalesce(color.hex, "#3B82F6")
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current,
    "color": coalesce(color.hex, "#3B82F6")
  },
  "categoryIds": categories[]._ref,
  tags,
  "readingTime": round(length(pt::text(content)) / 5 / 200)
`;

// Query to fetch all posts with pagination
export const allPostsQuery = defineQuery(`
  {
    "posts": *[_type == "post" && defined(slug.current)]
       | order(date desc, _updatedAt desc)  {
        ${postFields}
      },
    "total": count(*[_type == "post" && defined(slug.current)])
  }
`);

// The archive filter, shared by the projection below and the facet counts, so a
// category's badge can never disagree with the grid it links to.
//
// $category and $q are always strings — "" means "not applied". GROQ has no
// optional-parameter syntax, so the guard has to be written as a disjunction.
const postsIndexFilter = /* groq */ `
  _type == "post"
  && defined(slug.current)
  && ($category == "" || $category in categories[]->slug.current)
  && (
    $q == ""
    || title match $q
    || excerpt match $q
    || author->name match $q
    || count(categories[@->title match $q]) > 0
  )
`;

/*
 * The archive listing, split either side of its slice.
 *
 * Everything except the slice lives in these two fragments, so the runtime
 * query and the typegen twin below cannot drift apart: they are assembled from
 * the same characters and differ only in what sits between them.
 */
const postsIndexHead = /* groq */ `
  "posts": *[${postsIndexFilter}]
    | order(date desc, _updatedAt desc)
`;

const postsIndexTail = /* groq */ ` {
      ${postFields}
    },
  "total": count(*[${postsIndexFilter}]),
  // Resolved alongside the rows so the results header can name the active
  // topic without a second round trip.
  "categoryTitle": *[_type == "category" && slug.current == $category][0].title
`;

/*
 * The query that actually runs. The previous allPostsQuery accepted $limit and
 * $offset and then ignored them — it had no slice at all — so every "page"
 * fetched the entire post collection and rendered it, while the pager
 * underneath advertised page numbers that changed nothing. This one slices.
 *
 * Deliberately NOT wrapped in defineQuery. Sanity's typegen only analyses
 * defineQuery calls, and it rejects a slice built from parameters with
 * "slicing must use constant numbers" — an error it printed on every build,
 * including on the deploy host. Keeping this a plain string takes it out of
 * typegen's view; postsIndexShapeQuery below supplies the result type.
 */
export const postsIndexQuery = /* groq */ `{${postsIndexHead}  [$offset...$offset + $limit]${postsIndexTail}}`;

/*
 * Never fetched. It exists so typegen has a constant-sliced version of the
 * query above to derive PostsIndexShapeQueryResult from — the type
 * PostsResults annotates the real response with. The slice bound is arbitrary;
 * only the projection shape is read from it, and a slice always yields an
 * array, so the generated type describes the paged response exactly.
 *
 * Do not delete this alongside "unused" exports: removing it silently drops
 * the archive back to an untyped response.
 */
export const postsIndexShapeQuery = defineQuery(`{${postsIndexHead}  [0...20]${postsIndexTail}}`);

/*
 * Count only. Used to reject an out-of-range page *before* the response starts
 * streaming: once a Suspense boundary has flushed the shell, notFound() can no
 * longer change the status line, and the 404 renders under a 200.
 */
export const postsIndexCountQuery = defineQuery(`
  count(*[${postsIndexFilter}])
`);

// Facet counts for the filter rail. Counted over the same predicate as the
// listing (minus the category clause, which each row supplies itself), so the
// number on a chip is exactly how many stories that chip will show.
export const postsIndexFacetsQuery = defineQuery(`
  {
    "total": count(*[
      _type == "post"
      && defined(slug.current)
      && (
        $q == ""
        || title match $q
        || excerpt match $q
        || author->name match $q
        || count(categories[@->title match $q]) > 0
      )
    ]),
    "categories": *[_type == "category" && defined(slug.current)]
    | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "color": coalesce(color.hex, "#3B82F6"),
    "postCount": count(*[
      _type == "post"
      && defined(slug.current)
      && references(^._id)
      && (
        $q == ""
        || title match $q
        || excerpt match $q
        || author->name match $q
        || count(categories[@->title match $q]) > 0
        )
      ])
    }
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
// export const postsByCategoryQuery = defineQuery(`
//   {
//     "posts": *[_type == "post" && defined(slug.current) && category._ref == $categoryId]
//        | order(date desc) {
//         ${postFields}
//       },
//     "total": count(*[_type == "post" && defined(slug.current) && category._ref == $categoryId]),
//     "category": *[_type == "category" && _id == $categoryId][0] {
//       _id,
//       title,
//       "slug": slug.current,
//       description,
//       "color": coalesce(color.hex, "#3B82F6"),
//       image {
//         asset-> {
//           _id,
//           url
//         },
//         alt
//       },
//       featured,
//       "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
//     }
//   }
// `);


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

// export const settingsQuery = defineQuery(`
//   *[_type == "settings"][0]{
//     title,
//     description,
//     logo,
//     ogImage{
//       asset,
//       alt
//     },
//     socialLinks,
//     contactEmail,
//     phoneNumber,
//     addressLine1,
//     addressLine2,
//     city,
//     state,
//     zipCode,
//     country,
//     googleMapsLink,
//     metadataBase
//   }
// `);

// The featured card renders a headline, an excerpt and a photo — it never
// touched `content`, but the projection shipped the article's entire body to
// the browser on every home page render. `readingTime` inside postFields still
// measures the body server-side via pt::text(), so nothing is lost.
export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
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
    _updatedAt,
    seo,
    ${postFields}
  }
`);

// Candidate pool for "Continue reading". Relevance is the number of
// categories shared with the article being read; the caller sorts on it and
// falls back to recency, so a post with no category matches still fills the
// grid rather than leaving a gap.
export const relatedStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)]
  | order(date desc, _updatedAt desc) [0...12] {
    ${postFields},
    "relevance": count(categories[@._ref in $categoryIds])
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
/*
 * No [0...8] slice: there are nine categories, so the ninth was silently
 * unreachable from the sidebar — and the "View all categories" escape hatch is
 * commented out. postCount also counted status == "published" only, while every
 * listing on the site shows all posts, so each chip under-reported its own
 * archive. Both now match what a reader actually gets.
 */
export const sidebarCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] 
  | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "color": coalesce(color.hex, "#3B82F6"),
    "image": image.asset->url,
    featured,
    "postCount": count(*[_type == "post" && references(^._id) && defined(slug.current)])
  }
`);

// Trending posts for marquee
export const trendingPostsMarqueeQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && isTrending == true] 
  | order(date desc) [0...10] {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    // Same dead-field bug as postFields had: the schema stores an array of
    // references under "categories", so "category->title" always resolved to
    // null and every badge in the marquee came out empty.
    "category": categories[0]->title,
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
// export const enhancedAllPostsQuery = defineQuery(`
//   {
//     "posts": *[_type == "post" && defined(slug.current) && status == "published"] 
//       | order(date desc, _updatedAt desc) 
//       [$offset...$offset + $limit] {
//         ${postFields}
//       },
//     "total": count(*[_type == "post" && defined(slug.current) && status == "published"])
//   }
// `);
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


// /sanity/lib/queries.ts
export const socialMediaPostsQuery = defineQuery(`
  *[_type == "socialMediaPosts"] | order(_createdAt desc) [0] {
    _id,
    title,
    showInstagram,
    showLinkedin,
    showTwitter,
    "instagramPosts": instagramPosts[isActive == true]{
      embedHtml,
      fallbackDescription,
      isActive
    },
    "linkedinPosts": linkedinPosts[isActive == true]{
      embedHtml,
      fallbackDescription,
      isActive
    },
    "twitterPosts": twitterPosts[isActive == true]{
      embedHtml,
      fallbackDescription,
      isActive
    },
    lastUpdated,
    _createdAt,
    _updatedAt
  }
`);

// TypeScript interfaces
export interface SocialMediaPost {
  embedHtml: string;
  fallbackDescription: string;
  isActive: boolean;
}

export interface SocialMediaData {
  _id: string;
  title: string;
  showInstagram: boolean;
  showLinkedin: boolean;
  showTwitter: boolean;
  instagramPosts: SocialMediaPost[];
  linkedinPosts: SocialMediaPost[];
  twitterPosts: SocialMediaPost[];
  lastUpdated: string;
  _createdAt: string;
  _updatedAt: string;
}


export const COMMUNITY_ROLES_QUERY = defineQuery(
  `
*[_type == "communityRole"]{
  key,
  title,
  impact,
  description,
  skills,
  color,
  icon,
  actions,
  joinTeamUrl
} | order(title asc)
`
)


export const aboutPageQuery = defineQuery(
  `
  *[_type == "aboutPage"][0] {
    title,
    tagline,
    introText,
    stats[] {
      value,
      label
    },
    mission,
    vision,
    coreValues[] {
      title,
      description,
      icon
    },
    whatWeDo[] {
      title,
      description,
      icon
    },
    journey[] {
      year,
      title,
      description
    },
    seoTitle,
    seoDescription
  }
`
)

export const communityPageQuery = defineQuery(
  `*[_type == "communityPage"][0] {
  heroSection {
    badge,
    mainHeading,
    secondaryHeading,
    description,
    joinMovementUrl,
    founderMessageUrl,
    impactStats[] {
      value,
      label,
      icon
    }
  },
  testimonialsSection {
    title,
    description,
    testimonials[] {
      name,
      role,
      content,
      avatar
    }
  },
  achievementsSection {
    title,
    description,
    achievements[] {
      title,
      description,
      icon
    }
  },
  ctaSection {
    title,
    description,
    primaryButtonText,
    secondaryButtonText,
    hashtags
  }
}`
)
// sanity/lib/queries.ts
// ... existing imports and queries ...

// Add at the end
export const resourceDetailQuery = defineQuery(`
  *[_type == "post" && categories[]->slug.current match $type && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    coverImage {
      asset-> {
        url,
        metadata {
          lqip
        }
      },
      alt
    },
    author-> {
      name,
      picture
    },
    date,
    categories[]-> {
      title,
      slug
    },
    readingTime
  }
`);