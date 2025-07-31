import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingGridProps {
  count?: number;
  showLarge?: boolean[];
}

export const LoadingGrid = ({ count = 12, showLarge = [] }: LoadingGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => {
        const isLarge = showLarge[index] || (index === 0 || (index - 1) % 7 === 6);
        
        return (
          <Card 
            key={index} 
            className={`overflow-hidden ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}
          >
            <div className={`relative ${isLarge ? 'h-64 md:h-80' : 'h-48'}`}>
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className={`h-6 w-full mb-2 ${isLarge ? 'h-8' : ''}`} />
              <Skeleton className={`h-6 w-3/4 mb-3 ${isLarge ? 'h-8' : ''}`} />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};