import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while a post that was not pre-rendered is fetched. Mirrors the
 * article layout so the page does not reflow when the content lands.
 */
export default function Loading() {
  return (
    <div className="container py-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-x-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 space-y-8 lg:max-w-[46rem]">
          <div className="space-y-6">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-4/5" />
            </div>
            <Skeleton className="h-6 w-3/4" />
          </div>

          <div className="flex items-center gap-4 border-y border-border py-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />

          <div className="space-y-4 pt-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className={i % 4 === 3 ? "h-4 w-2/3" : "h-4 w-full"} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
