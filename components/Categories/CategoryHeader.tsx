"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
 
import { Post } from "@/types/post";
import { urlForImage } from "@/sanity/lib/image";

interface CategoryHeaderProps {
  posts: Post[];
  categoryName: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ posts, categoryName }) => {
  const firstPost = posts?.[0];
  if (!firstPost) return null;

  const { mainImage, categories, title, author, publishedAt } = firstPost;
  const imageUrl = mainImage ? urlForImage(mainImage).url() : null;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground capitalize">Category</div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl capitalize">
        {categoryName}
      </h1>

      <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-sm">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories?.map((cat) => (
          <Badge key={cat._id}>{cat.title}</Badge>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        By {author?.name || "Unknown"} • {new Date(publishedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default CategoryHeader;
