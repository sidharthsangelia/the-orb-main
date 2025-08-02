// components/posts/SearchResults.tsx
import { Button } from '@/components/ui/button';

interface SearchResultsProps {
  searchQuery: string;
  filteredCount: number;
  totalCount: number;
  onClearSearch: () => void;
}

export function SearchResults({ 
  searchQuery, 
  filteredCount, 
  totalCount, 
  onClearSearch 
}: SearchResultsProps) {
  if (!searchQuery) return null;

  return (
    <div className="text-center mt-12">
      <p className="text-muted-foreground">
        Showing {filteredCount} of {totalCount} stories for "{searchQuery}"
      </p>
      <Button
        variant="outline"
        onClick={onClearSearch}
        className="mt-4 border-primary/30 hover:bg-primary/10"
      >
        Clear Search
      </Button>
    </div>
  );
}