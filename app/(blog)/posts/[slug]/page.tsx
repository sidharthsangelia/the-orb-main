import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";
import MoreStories from "@/components/more-stories";
import CustomPortableText from "@/components/portable-text";
import { CTA } from "@/components/about/Cta";

type Props = {
  params: Promise<{ slug: string }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch({ query: postQuery, params, stega: false });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
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
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto mt-12 mb-16 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author + Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-muted-foreground">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
          <DateComponent dateString={post.date} />
        </div>

        {/* Cover Image */}
        <div className="mb-12">
          <CoverImage image={post.coverImage} priority />
        </div>

        {/* Blog Body */}
        {post.content?.length && (
          <CustomPortableText
            className="prose dark:prose-invert prose-lg max-w-none text-foreground"
            value={post.content as PortableTextBlock[]}
          />
        )}
      </article>

     <span className="mt-16 ">
      <CTA/>
     </span>

      {/* More Stories
      <aside className="mx-auto max-w-5xl mt-24 border-t border-border pt-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-8">
          Recent Stories
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={2} />
        </Suspense>
      </aside> */}

      {/* Related Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Continue Reading
            </h2>
            <Suspense fallback={
              <div className="flex justify-center items-center py-12">
                <div className="text-muted-foreground">Loading related stories...</div>
              </div>
            }>
              <MoreStories skip={post._id} limit={3} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
