import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateComponent from './date';
import { urlForImage } from '@/sanity/lib/utils';
// import { urlForImage } from "@/sanity/lib/image";

type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  date: string;
  author?: {
    name: string;
    picture?: any;
  };
};

export default function TriplePostGrid({ posts }: { posts: Post[] }) {
  const layoutClasses = [
    "col-span-2 row-span-4",               // Card 1
    "col-span-2 row-span-4 col-start-3",   // Card 2
    "col-span-2 row-span-4 col-start-5",   // Card 3
  ];

  return (
    <div className="  mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20 grid grid-cols-6 grid-rows-4 gap-4">
      {posts.map((post, idx) => {
        const imageUrl = post.coverImage
          ? urlForImage(post.coverImage)?.width(2000).height(1000).url()
          : undefined;

        return (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className={cn(
              "relative overflow-hidden rounded-2xl group shadow-sm",
              layoutClasses[idx]
            )}
          >
            {/* Image */}
            {imageUrl && (
              <Image
                className="h-full w-full object-cover rounded-lg"
                width={2000}
                height={1000}
                alt={post.title}
                src={imageUrl}
                sizes="100vw"
                priority={idx === 0}
              />
            )}

            {/* Softer Overlay */}
            <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/40 z-10 rounded-lg" />

            {/* Content */}
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white space-y-2">
              <h3 className="text-lg font-semibold leading-tight">
                {post.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-white/80">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {/* <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.picture?.asset?.url} />
                      <AvatarFallback>
                        {post.author.name?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar> */}
                    <span>{post.author.name}</span>
                  </div>
                )}
                <DateComponent dateString={post.date} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
