// app/resources/[slug]/page.tsx
import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import DateComponent from "@/components/date";
import CustomPortableText from "@/components/portable-text";
import { CTA } from "@/components/about/Cta";
import MoreStories from "@/components/more-stories";

type Props = {
  params: Promise<{ slug: string }>;
};

// Define query for all resource slugs
const resourceSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

// Define query for a single resource by slug
const resourceQuery = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    date,
    author->{
      name,
      picture
    },
    category->{
      title,
      "color": coalesce(color.hex, "#3B82F6")
    },
    content,
    status,
    readTime
  }`
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: resourceSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resource = await sanityFetch({ query: resourceQuery, params, stega: false });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(resource?.coverImage);

  return {
    authors: resource?.author?.name ? [{ name: resource?.author?.name }] : [],
    title: resource?.title,
    description: resource?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const [resource, settings] = await Promise.all([
    sanityFetch({ query: resourceQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!resource?._id) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto mt-12 mb-16 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          {resource.title}
        </h1>

        {/* Author + Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-muted-foreground">
          {resource.author && (
            <Avatar name={resource.author.name} picture={resource.author.picture} />
          )}
          <DateComponent dateString={resource.date} />
        </div>

        {/* Cover Image */}
        <div className="mb-12">
          <CoverImage image={resource.coverImage} priority />
        </div>

        {/* Resource Body */}
        {resource.content?.length && (
          <CustomPortableText
            className="prose dark:prose-invert prose-lg max-w-none text-foreground"
            value={resource.content as PortableTextBlock[]}
          />
        )}
      </article>

      <span className="mt-16">
        <CTA />
      </span>

      {/* Related Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Continue Exploring
            </h2>
            <Suspense fallback={
              <div className="flex justify-center items-center py-12">
                <div className="text-muted-foreground">Loading related resources...</div>
              </div>
            }>
              <MoreStories skip={resource._id} limit={3} type={resource.type} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}