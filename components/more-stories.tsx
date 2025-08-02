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
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => {
          const { _id, title, slug, coverImage, excerpt, author } = post;
          return (
            <article
              key={_id}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-zinc-900 border border-border/40"
            >
              <Link href={`/posts/${slug}`} className="block">
                <CoverImage image={coverImage} priority={false} />
              </Link>

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/posts/${slug}`} className="hover:underline">
                    {title}
                  </Link>
                </h3>

                <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                  {author && (
                    <Avatar
                      name={author.name}
                      picture={author.picture}
                  
                    />
                  )}
                  <DateComponent dateString={post.date} />
                </div>

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
