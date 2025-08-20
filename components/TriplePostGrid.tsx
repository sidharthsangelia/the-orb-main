import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import DateComponent from './date';
import { urlForImage } from '@/sanity/lib/utils';

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

function PostCard({ post }: { post: Post }) {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1651).height(1000).url()
    : 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1651&q=80';

  return (
    <div className="w-full group/card"> {/* 🔥 was w-96, now w-full */}
      <Link href={`/posts/${post.slug}`}>
        <div
          className={cn(
            "relative h-96 rounded-lg shadow-xl flex flex-col justify-between p-8 cursor-pointer overflow-hidden",
            "bg-cover bg-center transition-transform duration-500 group-hover/card:scale-[1.02]"
          )}
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition duration-300 rounded-lg"></div>
          
          {/* Author */}
          <div className="flex flex-row items-center space-x-4 z-10">
            {post.author?.picture ? (
              <Image
                height={40}
                width={40}
                alt={post.author.name || "Author"}
                src={urlForImage(post.author.picture)?.width(100).height(100).url() || "/default-avatar.png"}
                className="h-10 w-10 rounded-full border border-white/20 object-cover shadow-md"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                {post.author?.name?.[0] || "?"}
              </div>
            )}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-white">
                {post.author?.name || "Unknown Author"}
              </p>
              <div className="text-xs text-gray-300">
                <DateComponent dateString={post.date} />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="z-10">
            <h1 className="font-semibold text-xl md:text-2xl text-white leading-snug drop-shadow">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-3 text-sm text-gray-200 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}


// Main component to display cards in a horizontal row
export default function PostRowGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="w-full py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

