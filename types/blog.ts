export interface Author {
  name: string;
  picture?: any;
  slug?: string;
}

export interface Category {
  title: string;
  color: string;
  slug?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author: Author;
  category?: Category;
  readingTime?: number;
  status: 'draft' | 'published';
  featured?: boolean;
  content?: any;
}

export interface PostsData {
  posts: Post[];
  total: number;
}