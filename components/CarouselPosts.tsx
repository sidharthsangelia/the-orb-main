import * as React from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { VisualStoryDeck } from "@/components/landing/VisualStoryDeck";
import { client } from "@/sanity/lib/client";

interface Slide {
  src: string;
  alt?: string;
}

interface CarouselPost {
  _id: string;
  title: string;
  category?: { title: string | null; color: string | null } | null;
  slides: Slide[];
}

/*
 * `carouselPost` has no slug and no body in the schema — the slides are the
 * whole story, so these cards are deliberately terminal and carry no link.
 * The category colour comes through so the chip matches the one used by the
 * hero, the story row and the archive.
 */
const query = `*[_type == "carouselPost"] | order(_createdAt desc)[0...3]{
  _id,
  title,
  "category": category->{ title, "color": coalesce(color.hex, "#3B82F6") },
  slides[] {
    "src": image.asset->url,
    "alt": caption
  }
}`;

export default async function CarouselPosts() {
  const posts = await client.fetch<CarouselPost[]>(query);

  const decks = (posts ?? [])
    .map((post) => ({
      ...post,
      slides: (post.slides ?? []).filter((slide) => slide?.src),
    }))
    .filter((post) => post.slides.length > 0);

  if (!decks.length) return null;

  return (
    <section className="section-y" aria-label="Visual stories">
      <div className="container">
        <SectionHeading
          eyebrow="Beyond the blog"
          title="Visual stories"
          description="Curated visual narratives and insights designed for quick, impactful learning."
          className="mb-12"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((post, index) => (
            <VisualStoryDeck
              key={post._id}
              title={post.title}
              category={post.category}
              slides={post.slides}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
