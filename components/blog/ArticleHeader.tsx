import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Image } from "next-sanity/image";

import DateComponent from "@/components/date";
import { urlForImage } from "@/sanity/lib/utils";

type Category = {
  _id: string;
  title: string | null;
  slug: string | null;
  color: string | null;
};

type Props = {
  title: string;
  excerpt?: string | null;
  date: string;
  readingTime?: number | null;
  categories?: Category[] | null;
  author?: { name: string; picture: any } | null;
  coverImage?: any;
};

export default function ArticleHeader({
  title,
  excerpt,
  date,
  readingTime,
  categories,
  author,
  coverImage,
}: Props) {
  // GROQ rounds the estimate down, so very short posts arrive as 0.
  const minutes = Math.max(1, readingTime ?? 1);

  const authorImage = author?.picture?.asset?._ref
    ? urlForImage(author.picture)?.height(80).width(80).fit("crop").url()
    : null;

  const coverUrl = coverImage?.asset?._ref
    ? urlForImage(coverImage)?.width(1600).height(900).fit("crop").url()
    : null;

  return (
    <header className="space-y-8">
      <div className="space-y-6">
        <Link
          href="/posts"
          className="inline-flex mt-6 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All stories
        </Link>

        {!!categories?.length && (
          <ul className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <li key={category._id}>
                <Link
                  href={category.slug ? `/categories/${category.slug}` : "/posts"}
                  className="inline-flex rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-accent transition-colors hover:bg-brand-accent/20"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>

        {/* {excerpt && (
          // Standfirst: sets up the piece before the reader commits to it.
          <p className="max-w-[60ch] text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {excerpt}
          </p>
        )} */}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-border py-4 text-sm text-muted-foreground">
        {author && (
          <span className="flex items-center gap-2.5">
            {authorImage ? (
              <Image
                src={authorImage}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-xs font-semibold text-brand">
                {author.name.charAt(0)}
              </span>
            )}
            <span className="font-medium text-foreground">{author.name}</span>
          </span>
        )}

        <span aria-hidden="true" className="text-border">|</span>
        <DateComponent dateString={date} />

        <span aria-hidden="true" className="text-border">|</span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {minutes} min read
        </span>
      </div>

      {coverUrl && (
        <figure className="space-y-3">
          <Image
            src={coverUrl}
            alt={coverImage?.alt || ""}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw"
            className="aspect-[16/9] w-full rounded-2xl border border-border/60 object-cover"
          />
          {coverImage?.caption && (
            // Authored in the CMS and previously never rendered.
            <figcaption className="text-sm text-muted-foreground">
              {coverImage.caption}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  );
}
