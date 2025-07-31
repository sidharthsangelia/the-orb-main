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
    : 'https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80';

  return (
    <div className="w-96 flex-shrink-0 group/card">
      <Link href={`/posts/${post.slug}`}>
        <div
          className={cn(
            "cursor-pointer overflow-hidden relative card h-96 rounded-lg shadow-xl w-full flex flex-col justify-between p-8",
            "bg-cover bg-center"
          )}
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        >
          {/* Hover overlay */}
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60 rounded-lg"></div>
          
          {/* Author section */}
          <div className="flex flex-row items-center space-x-4 z-10">
            {post.author?.picture ? (
              <Image
                height={40}
                width={40}
                alt={post.author.name || "Author"}
                src={urlForImage(post.author.picture)?.width(100).height(100).url() || "/default-avatar.png"}
                className="h-10 w-10 rounded-full border-2 object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full border-2 bg-gray-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {post.author?.name?.[0] || "?"}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <p className="font-normal text-base text-gray-50 relative z-10">
                {post.author?.name || "Unknown Author"}
              </p>
              <div className="text-sm text-gray-400">
                <DateComponent dateString={post.date} />
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="text-content">
            <h1 className="font-bold text-xl md:text-2xl text-gray-100 relative z-10 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-normal text-sm text-gray-100 relative z-10 my-4 line-clamp-3">
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
        <div className="flex gap-10 overflow-x-auto pb-4 justify-center scrollbar-hide">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}