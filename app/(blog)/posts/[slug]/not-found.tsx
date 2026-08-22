import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * `notFound()` in the post route previously fell through to the bare Next.js
 * 404, which renders outside the site's shell entirely.
 */
export default function PostNotFound() {
  return (
    <div className="container flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Compass className="h-7 w-7" aria-hidden="true" />
      </span>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        This story isn&apos;t here
      </h1>

      <p className="mt-4 max-w-md text-pretty text-muted-foreground">
        The article you were looking for may have been moved or unpublished.
        There is plenty more to read on climate action across India.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Browse all stories
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
