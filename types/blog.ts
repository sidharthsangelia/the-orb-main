export interface Author {
  name: string;
  picture?: any;
  slug?: string;
}

// export interface Category {
//   title: string;
//   color: string;
//   slug?: string;
// }

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author: Author;
  isTrending?: boolean;
  category?: Category;
  readingTime?: number;
  status: "draft" | "published";
  featured?: boolean;
  content?: any;
}

export interface PostsData {
  posts: Post[];
  total: number;
}

// types/blog.ts

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: {
    hex?: string;
  };
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  postCount?: number;
}

// export interface Author {
//   _id: string;
//   name: string;
//   picture?: {
//     asset: {
//       _ref: string;
//     };
//     alt?: string;
//   };
//   bio?: string;
// }

// export interface Post {
//   _id: string;
//   _createdAt: string;
//   title: string;
//   slug: {
//     current: string;
//   };
//   excerpt?: string;
//   date: string;
//   coverImage?: {
//     asset: {
//       _ref: string;
//     };
//     alt?: string;
//   };
//   isTrending?: boolean;
//   readingTime?: number;
//   status: "published" | "draft";
//   author: Author;
//   category?: Category;
//   body?: any; // Portable text content
// }

export interface PostsData {
  posts: Post[];
  total: number;
  category?: Category;
}

export interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
}
