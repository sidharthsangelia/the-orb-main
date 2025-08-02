// components/posts/PostsSidebar.tsx
import { CategoriesSidebar } from './CategoriesSidebar';
import { TrendingPostsMarquee } from './TrendingPostMarquee';
 

interface Category {
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
}

interface TrendingPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  date: string;
}

interface PostsSidebarProps {
  categories: Category[];
  trendingPosts: TrendingPost[];
}

export function PostsSidebar({ categories, trendingPosts }: PostsSidebarProps) {
  return (
    <div className="space-y-8">
      <CategoriesSidebar 
        categories={categories}
        title="Browse by Category"
      />
      
      <TrendingPostsMarquee 
        posts={trendingPosts}
        title="Trending Now"
      />
    </div>
  );
}