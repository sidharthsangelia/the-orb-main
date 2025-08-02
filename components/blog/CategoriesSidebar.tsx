// components/posts/CategoriesSidebar.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

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

interface CategoriesSidebarProps {
  categories: Category[];
  title?: string;
  showFeaturedOnly?: boolean;
}

export function CategoriesSidebar({ 
  categories, 
  title = "Explore Categories",
  showFeaturedOnly = false 
}: CategoriesSidebarProps) {
  const displayCategories = showFeaturedOnly 
    ? categories.filter(cat => cat.featured)
    : categories;

  if (!displayCategories.length) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No categories available at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Discover climate stories by topic
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayCategories.map((category) => (
          <Link 
            key={category._id} 
            href={`/categories/${category.slug}`}
            className="block group"
          >
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 border border-transparent hover:border-border">
              {category.image?.asset?.url ? (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={category.image.asset.url}
                    alt={category.image.alt || category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `${category.color}15`,
                    border: `1px solid ${category.color}30`
                  }}
                >
                  <Tag 
                    className="h-5 w-5" 
                    style={{ color: category.color }}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm line-clamp-1">
                    {category.title}
                  </h3>
                  {category.featured && (
                    <Sparkles className="h-3 w-3 text-yellow-500" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-2 py-0.5"
                    style={{ 
                      backgroundColor: `${category.color}10`,
                      color: category.color,
                      borderColor: `${category.color}20`
                    }}
                  >
                    {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                  </Badge>
                  
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </div>
          </Link>
        ))}
        
        {displayCategories.length >= 6 && (
          <div className="pt-2 border-t border-border">
            <Button 
              asChild 
              variant="ghost" 
              className="w-full justify-center text-primary hover:text-primary hover:bg-primary/10"
            >
              <Link href="/categories">
                View All Categories
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}