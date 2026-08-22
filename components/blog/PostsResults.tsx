import Link from "next/link";
import { SearchX } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsIndexQuery } from "@/sanity/lib/queries";
import type { PostsIndexShapeQueryResult } from "@/sanity.types";
import { PostsGrid } from "@/components/blog/PostsGrid";
import { PostsPagination } from "@/components/blog/PostsPagination";
import {
  POSTS_PER_PAGE,
  postsIndexHref,
  toGroqMatch,
  totalPages as computeTotalPages,
} from "@/lib/posts-index";

interface PostsResultsProps {
  page: number;
  category: string;
  q: string;
}

/**
 * The only part of the archive that has to wait on the network, which is why it
 * lives behind its own Suspense boundary: the masthead, the search field and
 * the newsletter band all paint immediately while this streams in.
 */
export async function PostsResults({
  page,
  category,
  q,
}: PostsResultsProps) {
  /*
   * Annotated rather than inferred: Sanity's typegen refuses a slice built from
   * parameters ("slicing must use constant numbers"), so postsIndexQuery is
   * kept out of its view and postsIndexShapeQuery — assembled from the same
   * fragments with a constant slice — carries the type instead.
   */
  const data = (await sanityFetch({
    query: postsIndexQuery,
    params: {
      offset: (page - 1) * POSTS_PER_PAGE,
      limit: POSTS_PER_PAGE,
      category,
      q: toGroqMatch(q),
    },
  })) as PostsIndexShapeQueryResult;

  type PostRow = PostsIndexShapeQueryResult["posts"][number];

  const posts = (data?.posts ?? []).filter(
    (post: PostRow): post is PostRow & { slug: string } =>
      typeof post.slug === "string",
  );
  const total = data?.total ?? 0;
  const categoryTitle = data?.categoryTitle ?? null;
  const totalPages = computeTotalPages(total);
  const isFiltered = Boolean(category || q);

  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <SearchX className="h-6 w-6 text-brand" aria-hidden />
        </span>
        <h2 className="text-xl font-semibold text-foreground">
          {q ? `No stories match “${q}”` : "Nothing here yet"}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {isFiltered
            ? "Try a different topic or a broader search term — the full archive is one click away."
            : "New climate reporting lands here regularly. Check back soon."}
        </p>
        {isFiltered && (
          <Link
            href="/posts"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            Show all stories
          </Link>
        )}
      </div>
    );
  }

  const first = (page - 1) * POSTS_PER_PAGE + 1;
  const last = Math.min(page * POSTS_PER_PAGE, total);

  return (
    <div>
      {/*
       * A plain, honest summary of what the reader is looking at. The old page
       * had an "active category" chip wired to state that nothing ever set, so
       * it could not render at all.
       */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground tabular-nums">
            {first}–{last}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground tabular-nums">
            {total}
          </span>{" "}
          {total === 1 ? "story" : "stories"}
          {categoryTitle && (
            <>
              {" "}
              in <span className="font-medium text-foreground">{categoryTitle}</span>
            </>
          )}
          {q && (
            <>
              {" "}
              matching{" "}
              <span className="font-medium text-foreground">“{q}”</span>
            </>
          )}
        </p>

        {isFiltered && (
          <Link
            href="/posts"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Clear filters
          </Link>
        )}
      </div>

      <PostsGrid
        posts={posts.map((post: PostRow & { slug: string }) => ({
          _id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? undefined,
          coverImage: post.coverImage ?? undefined,
          date: post.date,
          author: {
            name: post.author?.name ?? "The Órb",
            picture: post.author?.picture ?? undefined,
          },
          category: post.category
            ? {
                title: post.category.title ?? "Uncategorised",
                color: post.category.color ?? "",
              }
            : undefined,
          readingTime: post.readingTime ?? undefined,
        }))}
        // The wide lead card belongs to the front of the unfiltered archive
        // only — everywhere else it would imply an editorial choice that the
        // sort order did not make.
        feature={page === 1 && !isFiltered}
      />

      <PostsPagination
        currentPage={Math.min(page, totalPages)}
        totalPages={totalPages}
        category={category}
        q={q}
      />
    </div>
  );
}

export { postsIndexHref };
