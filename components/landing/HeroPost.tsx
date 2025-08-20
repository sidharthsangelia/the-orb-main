import Link from "next/link";
import React from "react";
import CoverImage from "../cover-image";
import DateComponent from "../date";
import Avatar from "../avatar";
import { HeroQueryResult } from "@/sanity.types";

export default function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
}: Pick<
  Exclude<HeroQueryResult, null>,
  "title" | "coverImage" | "date" | "excerpt" | "author" | "slug"
>) {
  return (
    <article className="w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        <div className="relative rounded-xl bg-muted/30 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 lg:p-10">
          {/* Mobile Layout (stacked) */}
          <div className="block lg:hidden space-y-6">
            {/* Cover Image */}
            <div className="w-full">
              <Link
                href={`/posts/${slug}`}
                className="group block overflow-hidden rounded-lg"
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <CoverImage image={coverImage} priority />
                </div>
              </Link>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                <Link
                  href={`/posts/${slug}`}
                  className="hover:text-secondary transition-colors"
                >
                  {title}
                </Link>
              </h2>

              {excerpt && (
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3">
                  {excerpt}
                </p>
              )}

              {/* Meta + Read More (inline on mobile too) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                {author && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Avatar name={author.name} picture={author.picture} />
                  </div>
                )}
                {author && (
                  <span className="hidden sm:inline text-muted-foreground/60">
                    •
                  </span>
                )}
                <DateComponent dateString={date} />

                {/* Read More right next to date */}
                <Link
                  href={`/posts/${slug}`}
                  className="inline-flex items-center text-sm font-medium text-secondary hover:underline ml-2"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Layout (grid) */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start">
            {/* Cover Image */}
            <div className="col-span-2 row-span-3 overflow-hidden rounded-lg">
              <Link href={`/posts/${slug}`} className="group block">
                <CoverImage image={coverImage} priority />
              </Link>
            </div>

            {/* Content */}
            <div className="col-span-3 row-span-3 col-start-3 space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl xl:text-5xl text-foreground leading-tight">
                <Link
                  href={`/posts/${slug}`}
                  className="hover:text-secondary transition-colors"
                >
                  {title}
                </Link>
              </h2>

              {excerpt && (
                <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
                  {excerpt}
                </p>
              )}

              {/* Meta + Read More inline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
                {author && (
                  <div className="flex items-center gap-2">
                    <Avatar name={author.name} picture={author.picture} />
                  </div>
                )}
                {author && (
                  <span className="hidden sm:inline text-muted-foreground/60">
                    •
                  </span>
                )}
                <DateComponent dateString={date} />

                <Link
                  href={`/posts/${slug}`}
                  className="inline-flex items-center text-sm font-medium text-secondary hover:underline ml-2"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
