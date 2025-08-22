// components/posts/TrendingPostsMarquee.tsx
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, User } from 'lucide-react';
import { Marquee } from '@/components/magicui/marquee';

interface TrendingPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  date: string;
}

interface TrendingPostsMarqueeProps {
  posts: TrendingPost[];
  title?: string;
}

export function TrendingPostsMarquee({
  posts,
  title = 'Trending Now',
}: TrendingPostsMarqueeProps) {
  if (!posts.length) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center mt-4 gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No trending posts at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex mt-4 items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Hot topics in climate action
        </p>
      </CardHeader>

      <CardContent className="h-80 overflow-hidden">
        <Marquee vertical pauseOnHover   className="[&>*]:mb-4 ">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="group block w-full p-3 rounded-md border border-border bg-background hover:bg-muted/40 transition-colors shadow-sm"
            >
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary line-clamp-2 mb-1">
                {post.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="truncate">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              {post.category && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 h-auto">
                  {post.category}
                </Badge>
              )}
            </Link>
          ))}
        </Marquee>
      </CardContent>
    </Card>
  );
}
