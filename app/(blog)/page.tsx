import Link from "next/link";
import { Suspense } from "react";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutPageQuery,
  heroPostsGridQuery,
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
  const [settings, heroPost, heroPostGrid, tripleCardPosts, partners, aboutData] =
    await Promise.all([
      sanityFetch({
        query: settingsQuery,
      }),
      sanityFetch({ query: heroQuery }),
      sanityFetch({ query: heroPostsGridQuery }),
      sanityFetch({ query: tripleCardGridQuery }),
      sanityFetch({ query: partnersQuery }),
      sanityFetch({ query: aboutPageQuery }),
    ]);

      // Fallback data in case Sanity data is not available
      const defaultData: AboutPageData = {
        title: "Building Bridges Between Awareness & Action",
        tagline: "Building Bridges Between Awareness & Action",
        introText: "We are The Órb - a dynamic media organization driven by youth, dedicated to promoting sustainability in India. We transform climate discussions into actionable solutions.",
        stats: [
          { value: "94%", label: "Youth Aware of Climate Change" },
          { value: "50,000+", label: "Youth Engaged" },
          { value: "200+", label: "Stories Published" },
          { value: "25+", label: "Cities Reached" }
        ],
        mission: "To empower businesses and communities with innovative digital solutions that drive sustainable growth, enhance user experiences, and create lasting environmental value in India's evolving green economy. We connect climate awareness with tangible action through youth-driven initiatives.",
        vision: "India is at a pivotal moment regarding its climate future. We envision a generation of empowered youth leading India's green transformation, where sustainable living is essential, not a privilege. We are the bridge between climate awareness and scalable action.",
        coreValues: [
          {
            title: "Planet First",
            description: "Every decision we make prioritizes environmental impact and sustainability for future generations.",
            icon: "Leaf"
          },
          {
            title: "Youth Empowerment",
            description: "We believe young voices are the catalyst for meaningful climate action and systemic change.",
            icon: "Users"
          },
          {
            title: "Authentic Storytelling",
            description: "We share real stories from the ground to humanize climate issues and inspire genuine action.",
            icon: "Heart"
          },
          {
            title: "Knowledge for Action",
            description: "We transform complex climate science into accessible, actionable knowledge for everyday implementation.",
            icon: "Lightbulb"
          }
        ],
      
        
      };
    
      // Use Sanity data if available, otherwise use default data
      const data = aboutData || defaultData;

  return (
    <div className="    ">
      {/* <Intro title={settings?.title} description={settings?.description} /> */}
 
      <div className="   container mx-auto ">
        <LucyHero />
        <OurPartners partners={partners} />

        <MissionVisionSection />
         <StatsSection stats={data.stats} />

        {heroPost ? (
          // <HeroPostsGrid posts={heroPostGrid}/>

          <HeroPost
            title={heroPost.title}
            slug={heroPost.slug}
            coverImage={heroPost.coverImage}
            excerpt={heroPost.excerpt}
            date={heroPost.date}
            author={heroPost.author}
          />
        ) : (
          <Onboarding />
        )}

        {tripleCardPosts && (
          <PostRowGrid
            posts={tripleCardPosts
              .filter((post: any) => typeof post.slug === "string")
              .map((post: any) => ({
                ...post,
                slug: post.slug as string,
              }))}
          />
        )}

 
        <CoreValuesSection coreValues={data.coreValues} />

        <CTA />
      </div>
    </div>
  );
}
