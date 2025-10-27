import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { moreStoriesQuery } from "@/sanity/lib/queries";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import Avatar from "./avatar";

export default async function MoreStories(params: {
  skip: string;
  limit: number;
}) {
  const data = await sanityFetch({ query: moreStoriesQuery, params });

  return (
    <section className="container mx-auto px-4 pb-4 sm:px-6 lg:px-8 lg:pt-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => {
          const { _id, title, slug, coverImage, excerpt, author } = post;
          return (
            <article
              key={_id}
              className="group rounded-xl overflow-hidden border border-border/20 bg-white dark:bg-muted/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover image */}
              <Link href={`/posts/${slug}`} className="block relative">
                <CoverImage
                  image={coverImage}
                  priority={false}
                 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">
                  <Link href={`/posts/${slug}`} className="hover:underline">
                    {title}
                  </Link>
                </h3>

                {/* Author + Date */}
                <div className="mb-3 flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                  {author && (
                    <div className="flex items-center gap-2">
                      <Avatar name={author.name} picture={author.picture} />
                      
                    </div>
                  )}
                  {author && (
                    <span className="hidden sm:inline text-muted-foreground/50">
                      •
                    </span>
                  )}
                  <DateComponent dateString={post.date} />
                </div>

                {/* Excerpt */}
                {excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {excerpt}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
