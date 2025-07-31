import Link from "next/link";
import { Suspense } from "react";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroPostsGridQuery, heroQuery, partnersQuery, settingsQuery, tripleCardGridQuery } from "@/sanity/lib/queries";
import Onboarding from "@/components/onboarding";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/landing/HeroPost";
import Header1 from "@/components/mvpblocks/header-1";
import Hero from "@/components/mvpblocks/Hero";
import LucyHero from "@/components/mvpblocks/mockup-hero";
import GradientHero from "@/components/mvpblocks/Hero";
import AboutUs2 from '@/components/mvpblocks/about-us-2'
import HeroPostsGrid from "@/components/landing/HeroPost";
 
import Earth from "@/components/mvpblocks/Globe";
import { OurPartners } from "@/components/about/OurPartners";
import { MissionVisionSection } from "@/components/about/MissionVision";
import { StatsSection } from "@/components/about/Stats";
import { CoreValuesSection } from "@/components/about/CoreValues";
import { CTA } from "@/components/about/Cta";
import TriplePostCard  from "@/components/TriplePostGrid";
import PostCard from "@/components/TriplePostGrid";
import PostRowGrid from "@/components/TriplePostGrid";
export const revalidate = 10; // Revalidate every 10 seconds

function Intro(props: { title: string | null | undefined; description: any ; siteLogo: any}) {
  const title = props.title || demo.title;
  const logo = props.siteLogo
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
  const [settings, heroPost, heroPostGrid,  tripleCardPosts, partners] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
    sanityFetch({ query: heroQuery }),
    sanityFetch({ query: heroPostsGridQuery }),
     sanityFetch({ query: tripleCardGridQuery }),
     sanityFetch({ query: partnersQuery }),
  ]);

  return (
    <div className=" mx-auto ">
      {/* <Intro title={settings?.title} description={settings?.description} /> */}
      {/* <Header1 title={settings?.title} description={settings?.description} logo={settings?.siteLogo} /> */}
      <LucyHero/>
      <OurPartners partners={partners}/>
    {/* <GradientHero/>
      <Earth
              baseColor={[1, 0, 0.3]}
              markerColor={[1, 0, 0.33]}
              glowColor={[1, 0, 0.3]}
            /> */}
       {/* <AboutUs2/> */}
       <MissionVisionSection/>
       <StatsSection/>

        {/* {heroPostGrid ? (
        <HeroPostsGrid posts={heroPostGrid} />
      ) : null} */}
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
      }))
    }
  />
)}

      <CoreValuesSection/>
      <CTA/>
      {/* {heroPost?._id && (
        <aside>
          <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            More Stories
          </h2>
          <Suspense>
            <MoreStories skip={heroPost._id} limit={100} />
          </Suspense>
        </aside>
      )} */}
    </div>
  );
}
