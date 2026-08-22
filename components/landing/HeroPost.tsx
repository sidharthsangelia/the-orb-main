import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Leaf, User } from "lucide-react";

import { CategoryChip } from "@/components/ui/category-chip";
import { urlForImage } from "@/sanity/lib/utils";
import type { HeroQueryResult } from "@/sanity.types";

type HeroPostProps = Pick<
  Exclude<HeroQueryResult, null>,
  | "title"
  | "coverImage"
  | "date"
  | "excerpt"
  | "author"
  | "slug"
  | "category"
  | "readingTime"
>;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : dateFormatter.format(parsed);
}

export default function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  category,
  readingTime,
}: HeroPostProps) {
  const href = `/posts/${slug}`;
  const published = formatDate(date);
  const minutes = Math.max(1, readingTime ?? 1);

  const imageUrl = coverImage
    ? urlForImage(coverImage)?.width(1400).height(1200).fit("crop").url()
    : null;

  const authorImage = author?.picture
    ? urlForImage(author.picture)?.width(80).height(80).fit("crop").url()
    : null;

  return (
    <article className="container">
      {/*
       * One responsive layout. The mobile and desktop variants used to be two
       * complete copies of this markup, so every heading, excerpt and author
       * block existed twice in the DOM.
       *
       * The image is flush to the card edge rather than inset inside padding —
       * an inset thumbnail reads as a list row, a bled photo reads as a lead.
       */}
      <div className="group relative grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand/30 hover:shadow-xl focus-within:border-brand/40 lg:min-h-[27rem] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted lg:aspect-auto lg:h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={coverImage?.alt || ""}
              fill
              /* The only above-the-fold photograph in this band. */
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/15 to-brand-accent/15">
              <Leaf className="h-10 w-10 text-brand/60" aria-hidden />
            </div>
          )}

          {category && (
            <CategoryChip
              category={category}
              tone="onImage"
              className="absolute left-5 top-5 shadow-sm"
            />
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Featured story
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {minutes} min read
            </span>
          </div>

          {/*
           * h3: this sits beneath the section's own h2. The whole card is the
           * hit target via the stretched pseudo-element — the previous version
           * pointed three separate links at the same URL, which is three tab
           * stops and three identical entries in a screen reader's link list
           * for one story.
           */}
          <h3 className="mt-5 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-3xl lg:text-[2.125rem] lg:leading-[1.15]">
            <Link
              href={href}
              className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              {title}
            </Link>
          </h3>

          {excerpt && (
            <p className="mt-4 line-clamp-3 text-pretty text-base leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            {authorImage ? (
              <Image
                src={authorImage}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
              />
            ) : (
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted"
              >
                <User className="h-4 w-4 text-muted-foreground" />
              </span>
            )}
            <span className="font-medium text-foreground">
              {author?.name || "The Órb"}
            </span>
            {published && (
              <>
                <span aria-hidden className="text-border">
                  •
                </span>
                <time dateTime={date} className="text-muted-foreground">
                  {published}
                </time>
              </>
            )}
          </div>

          {/* Visual affordance only — the card already links to the story. */}
          <span
            aria-hidden
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent transition-colors group-hover:text-brand"
          >
            Read the full story
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
