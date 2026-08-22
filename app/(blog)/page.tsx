import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutPageQuery,
  heroQuery,
  partnersQuery,
  settingsQuery,
  tripleCardGridQuery,
} from "@/sanity/lib/queries";
import Onboarding from "@/components/onboarding";

import HeroPost from "@/components/landing/HeroPost";

import LucyHero from "@/components/mvpblocks/mockup-hero";

import { OurPartners } from "@/components/about/OurPartners";
import { MissionVisionSection } from "@/components/about/MissionVision";
import { StatsSection } from "@/components/about/Stats";
import { CoreValuesSection } from "@/components/about/CoreValues";
import { CTA } from "@/components/about/Cta";

import PostRowGrid from "@/components/TriplePostGrid";
import NewsletterCard from "@/components/NewsletterCard";
import CarouselPosts from "@/components/CarouselPosts";
import NewsletterArticleCard from "@/components/NewsLetterArticleCard";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 10; // Revalidate every 10 seconds

function Intro(props: {
  title: string | null | undefined;
  description: any;
  siteLogo: any;
}) {
  const title = props.title || demo.title;
  const logo = props.siteLogo;
  // const description = props.description?.length
  //   ? props.description
  //   : demo.description;
  return (
    <section className="mt-16 mb-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
      <h1 className="text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
        {title || demo.title}
      </h1>
      {/* <h2 className="text-pretty mt-5 text-center text-lg lg:pl-8 lg:text-left">
        <PortableText
          className="prose-lg"
          value={description?.length ? description : demo.description}
        />
      </h2> */}
    </section>
  );
}

export default async function Page() {
  /*
   * `heroPostsGridQuery` used to be fetched here and destructured into a
   * `heroPostGrid` binding that nothing ever read — five fully projected posts
   * pulled from Sanity on every render and thrown away.
   */
  const [settings, heroPost, tripleCardPosts, partners, aboutData] =
    await Promise.all([
      sanityFetch({ query: settingsQuery }),
      sanityFetch({ query: heroQuery }),
      sanityFetch({ query: tripleCardGridQuery }),
      sanityFetch({ query: partnersQuery }),
      sanityFetch({ query: aboutPageQuery }),
    ]);

  // Fallback data in case Sanity data is not available
  const defaultData = {
    title: "Building Bridges Between Awareness & Action",
    tagline: "Building Bridges Between Awareness & Action",
    introText:
      "We are The Órb - a dynamic media organization driven by youth, dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.",
    stats: [
      { value: "94%", label: "Youth Aware of Climate Change" },
      { value: "50,000+", label: "Youth Engaged" },
      { value: "200+", label: "Stories Published" },
      { value: "25+", label: "Cities Reached" },
    ],
    mission:
      "To empower businesses and communities with innovative digital solutions that drive sustainable growth, enhance user experiences, and create lasting environmental value in India's evolving green economy. We connect climate awareness with tangible action through youth-driven initiatives.",
    vision:
      "India is at a pivotal moment regarding its climate future. We envision a generation of empowered youth leading India's green transformation, where sustainable living is essential, not a privilege. We are the bridge between climate awareness and scalable action.",
    coreValues: [
      {
        title: "Planet First",
        description:
          "Every decision we make prioritizes environmental impact and sustainability for future generations.",
        icon: "Leaf",
      },
      {
        title: "Youth Empowerment",
        description:
          "We believe young voices are the catalyst for meaningful climate action and systemic change.",
        icon: "Users",
      },
      {
        title: "Authentic Storytelling",
        description:
          "We share real stories from the ground to humanize climate issues and inspire genuine action.",
        icon: "Heart",
      },
      {
        title: "Knowledge for Action",
        description:
          "We transform complex climate science into accessible, actionable knowledge for everyday implementation.",
        icon: "Lightbulb",
      },
    ],
  };

  // Use Sanity data if available, otherwise use default data
  const data = aboutData || defaultData;

  // Ensure stats and coreValues are never null by providing fallbacks
  const safeStats = data.stats || defaultData.stats;
  const safeCoreValues = data.coreValues || defaultData.coreValues;

  return (
    <div className="w-full">
      {/* <Intro title={settings?.title} description={settings?.description} /> */}

      <LucyHero />

      <OurPartners partners={partners} />

      {/*
        <MissionVisionSection /> */}

      <StatsSection
        className="section-y"
        stats={safeStats.map((stat: any) => ({
          value: stat.value ?? "",
          label: stat.label ?? "",
        }))}
      />

      <CarouselPosts />

      {heroPost ? (
        <section className="section-y" aria-label="Latest stories">
          <div className="container">
            <SectionHeading
              eyebrow="From the blog"
              title="Voices for a Sustainable Future"
              description="Explore stories from young changemakers driving climate action across India."
              className="mb-12"
            />
          </div>

          {/* Featured story, then the next three */}
          <div className="space-y-8 sm:space-y-10">
            <HeroPost
              title={heroPost.title}
              slug={heroPost.slug}
              coverImage={heroPost.coverImage}
              excerpt={heroPost.excerpt}
              date={heroPost.date}
              author={heroPost.author}
              category={heroPost.category}
              readingTime={heroPost.readingTime}
            />

            <PostRowGrid
              posts={tripleCardPosts
                .filter((post: any) => typeof post.slug === "string")
                .map((post: any) => ({
                  ...post,
                  slug: post.slug as string,
                }))}
            />

            {/*
             * The band used to end on the third card with nothing to click.
             * Four stories is a taste of the archive, not the archive.
             */}
            <div className="container flex justify-center pt-2">
              <Link
                href="/posts"
                className="group/all inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-[color,background-color,border-color,box-shadow] hover:border-brand/40 hover:bg-brand hover:text-brand-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                View all stories
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover/all:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <Onboarding />
      )}

      {/* <NewsletterCard /> */}
      <div className="section-y">
        <NewsletterArticleCard />
      </div>

      <CoreValuesSection
        coreValues={safeCoreValues.map((cv: any) => ({
          title: cv.title ?? "",
          description: cv.description ?? "",
          icon: cv.icon ?? "",
        }))}
      />

      {/* <CTA /> */}
    </div>
  );
}
