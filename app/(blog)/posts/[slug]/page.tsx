import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";
import MoreStories from "@/components/more-stories";
import CustomPortableText from "@/components/portable-text";
import { CTA } from "@/components/about/Cta";
import NewsletterArticleCard from "@/components/NewsLetterArticleCard";
import SocialShare from "@/components/blog/SocialShare";
import AuthorCard from "@/components/blog/AuthorCard";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

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

// Remove the manual ogImage generation and simplify
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch({ query: postQuery, params, stega: false });

  return {
    title: post?.title,
    description: post?.excerpt ?? undefined,
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    // Remove the manual openGraph images - Next.js will automatically use opengraph-image.tsx
    openGraph: {
      title: post?.title,
      description: post?.excerpt ?? undefined,
      type: "article",
      publishedTime: post?.date,
      authors: post?.author?.name ? [post?.author?.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.excerpt ?? undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) return notFound();

  return (
    <div className="container pt-10 mx-auto px-4 sm:px-6 lg:px-8">
      <article className="mx-auto pt-10 mb-16 max-w-3xl lg:max-w-4xl space-y-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>

        {/* Author + Date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-muted-foreground text-sm">
          {post.author && (
            <div className="flex items-center gap-3">
              <Avatar name={post.author.name} picture={post.author.picture} />
            </div>
          )}
          {post.author && (
            <span className="hidden sm:inline text-muted-foreground/50">•</span>
          )}
          <DateComponent dateString={post.date} />
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <CoverImage image={post.coverImage} priority />
        </div>

        {/* Blog Body */}
        {post.content?.length && (
          <CustomPortableText
            className="prose dark:prose-invert prose-base sm:prose-lg max-w-none text-foreground leading-relaxed"
            value={post.content as PortableTextBlock[]}
          />
        )}
      </article>

      <SocialShare
        url={`https://theorbearth.in/posts/${post.slug}`}
        title={post.title}
      />

      {/* Author Details Card */}

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

      {/* Continue Reading */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto text-center px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">
            Continue Reading
          </h2>
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-12">
                <div className="text-muted-foreground">
                  Loading related stories...
                </div>
              </div>
            }
          >
            <MoreStories skip={post._id} limit={3} />
          </Suspense>
        </div>
      </section>

      <NewsletterArticleCard />
      {/* CTA */}
      <div className="mt-12 sm:mt-16 flex justify-center">
        <CTA />
      </div>
    </div>
  );
}
