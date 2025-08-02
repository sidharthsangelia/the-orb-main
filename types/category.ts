// types/category.ts
export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  color?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  featured?: boolean;
  postCount?: number;
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

export interface CategorySEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: {
    asset: {
      url: string;
    };
  };
}

export interface CategoryWithSEO extends Category {
  seo?: CategorySEO;
}