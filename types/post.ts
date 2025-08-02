// types/posts.ts
export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author: {
    name: string;
    picture?: any;
  };
  category?: {
    title: string;
    color: string;
  };
  readingTime?: number;
  status?: string;
}

export interface PostsData {
  posts: Post[];
  total: number;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  color: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  postCount: number;
  featured?: boolean;
  order?: number;
}

export interface TrendingPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  date: string;
}

export interface SidebarData {
  categories: Category[];
  trendingPosts: TrendingPost[];
}