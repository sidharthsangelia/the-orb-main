import { defineQuery } from "next-sanity";
import type { Metadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import { extractHeadings, MIN_HEADINGS } from "@/lib/portable-text";

import CustomPortableText from "@/components/portable-text";
import MoreStories from "@/components/more-stories";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorCard from "@/components/blog/AuthorCard";
import SocialShare from "@/components/blog/SocialShare";
import NewsletterArticleCard from "@/components/NewsLetterArticleCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  params: Promise<{ slug: string }>;
};

// Posts were fully static with no revalidation, so a published correction only
// reached readers on the next deploy. Matches the cadence used on the homepage.
export const revalidate = 60;

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch({ query: postQuery, params, stega: false });

  if (!post) return {};

  // The `seo` object is authored per-post in Sanity and was previously ignored
  // entirely; fall back to the article's own title/excerpt when it is empty.
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || undefined;
  const ogImage =
    resolveOpenGraphImage(post.seo?.ogImage) ??
    resolveOpenGraphImage(post.coverImage);

  return {
    title,
    description,
    keywords: post.seo?.keywords ?? post.tags ?? undefined,
    authors: post.author?.name ? [{ name: post.author.name }] : [],
    alternates: post.slug ? { canonical: `/posts/${post.slug}` } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : [],
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.url] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await sanityFetch({ query: postQuery, params });

  if (!post?._id) return notFound();

  const content = (post.content ?? []) as PortableTextBlock[];
  const headings = extractHeadings(content);

  return (
    <>
      <ReadingProgress targetId="article-body" />

      <div className="container py-10 lg:py-16">
        {/*
         * One grid governs the whole article. The text column is capped at a
         * readable measure and the table of contents occupies the gutter
         * beside it, so every band below shares the same left edge.
         */}
        <div className="mx-auto grid max-w-6xl gap-x-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="min-w-0 lg:max-w-[46rem]">
            <ArticleHeader
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readingTime={post.readingTime}
              categories={post.categories}
              author={post.author}
              coverImage={post.coverImage}
            />

            {headings.length >= MIN_HEADINGS && (
              <TableOfContents headings={headings} variant="inline" className="mt-8 lg:hidden" />
            )}

            {content.length > 0 && (
              <div id="article-body" className="mt-10">
                <CustomPortableText
                  // max-w-none lets the grid own the measure; prose's own
                  // 65ch would fight the column width set above.
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-p:leading-[1.75] prose-img:rounded-xl"
                  value={content}
                />
              </div>
            )}

            {!!post.tags?.length && (
              <div className="mt-12 border-t border-border pt-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Topics
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.slug && (
              <SocialShare
                url={`https://theorbearth.in/posts/${post.slug}`}
                title={post.title}
              />
            )}

            {post.author && (
              <AuthorCard
                name={post.author.name}
                picture={
                  post.author.picture?.asset?._ref
                    ? (urlForImage(post.author.picture)
                        ?.height(256)
                        .width(256)
                        .fit("crop")
                        .url() as string)
                    : "/default-avatar.jpg"
                }
                bio={post.author.bio ?? undefined}
              />
            )}
          </article>

          {/* Gutter rail — hidden below lg, where the collapsible copy above
              takes over. */}
          <aside className="hidden lg:block">
            {headings.length >= MIN_HEADINGS && <TableOfContents headings={headings} variant="rail" />}
          </aside>
        </div>
      </div>

      <section className="section-y border-t border-border bg-muted/30">
        <div className="container">
          <SectionHeading
            eyebrow="Keep reading"
            title="Related stories"
            description="More reporting from the youth driving India's climate response."
            align="left"
            className="mb-10"
          />
          <Suspense fallback={<RelatedSkeleton />}>
            <MoreStories
              skip={post._id}
              limit={3}
              categoryIds={post.categoryIds ?? []}
            />
          </Suspense>
        </div>
      </section>

      <div className="section-y">
        <NewsletterArticleCard />
      </div>
    </>
  );
}

function RelatedSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}
