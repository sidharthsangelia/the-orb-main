import Link from 'next/link';
import React from 'react';
import CoverImage from '../cover-image';
import DateComponent from '../date';
import Avatar from '../avatar';
import { HeroQueryResult } from '@/sanity.types';

export default function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
}: Pick<
  Exclude<HeroQueryResult, null>,
  'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug'
>) {
  return (
    <article className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid grid-cols-5 grid-rows-3   gap-8 items-start">
        {/* Cover Image - spans larger portion */}
        <div className=" col-span-2 row-span-3">
          <Link href={`/posts/${slug}`} className="group block mb-6 md:mb-0">
            <CoverImage image={coverImage} priority />
          </Link>
        </div>

        {/* Content Area - spans smaller portion */}
        <div className=" col-span-3 row-span-3 col-start-3 space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            <Link href={`/posts/${slug}`} className="hover:text-secondary">
              {title}
            </Link>
          </h2>
          {/* {excerpt && (
            <p className="text-base leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          )} */}
          <p className="text-muted-foreground text-sm flex items-center gap-2">
             {author && <Avatar name={author.name} picture={author.picture} />}
            <DateComponent dateString={date} />
          </p>
         
        </div>
      </div>
    </article>
  );
}
