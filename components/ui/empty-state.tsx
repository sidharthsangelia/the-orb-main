import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

export const EmptyState = ({ 
  title = "No posts found", 
  description = "Check back later for new content.",
  showHomeButton = true 
}: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
        <FileText className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-2xl font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {showHomeButton && (
        <Button asChild variant="outline">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      )}
    </div>
  );
};