// components/posts/EmptyState.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  isSearchResult?: boolean;
  onClearSearch?: () => void;
}

export function EmptyState({ 
  title = "No stories found", 
  description = "Check back for new climate insights and youth-driven initiatives.",
  showHomeButton = true,
  isSearchResult = false,
  onClearSearch
}: EmptyStateProps) {
  const icon = isSearchResult ? Search : Leaf;
  const IconComponent = icon;

  return (
    <div className="text-center py-16 col-span-full">
      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
        <IconComponent className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {isSearchResult && onClearSearch && (
          <Button 
            onClick={onClearSearch}
            variant="outline" 
            className="border-primary/30 hover:bg-primary/10"
          >
            Clear Search
          </Button>
        )}
        
        {showHomeButton && (
          <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}