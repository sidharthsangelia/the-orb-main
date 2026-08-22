import { sanityFetch } from "@/sanity/lib/fetch";
import {
  postsIndexFacetsQuery,
  trendingPostsMarqueeQuery,
} from "@/sanity/lib/queries";
import { toGroqMatch } from "@/lib/posts-index";
import {
  buildEntries,
  CategoryFilterBar,
  CategoryFilterList,
  CategoryFilterStrip,
  type FacetCategory,
} from "@/components/blog/CategoryFilterRail";
import { TrendingRail } from "@/components/blog/TrendingRail";

interface PostsFilterPanelProps {
  category: string;
  q: string;
  variant: "rail" | "bar";
}

/**
 * Facet counts and trending share one boundary because they are one visual
 * unit and one round trip; splitting them would only add a second skeleton
 * flickering next to the first.
 */
export async function PostsFilterPanel({
  category,
  q,
  variant,
}: PostsFilterPanelProps) {
  const [facets, trending] = await Promise.all([
    sanityFetch({
      query: postsIndexFacetsQuery,
      params: { q: toGroqMatch(q) },
    }),
    // Trending is a fixed editorial list — it does not react to the filters,
    // so it is only worth fetching for the persistent desktop rail.
    variant === "rail"
      ? sanityFetch({ query: trendingPostsMarqueeQuery })
      : Promise.resolve([]),
  ]);

  const categories = (facets?.categories ?? []) as FacetCategory[];
  // Counted by the query, not summed from the facets: a post can sit in more
  // than one category, so adding the chips up would overstate the archive.
  const totalCount = facets?.total ?? 0;

  const trendingPosts = (trending ?? [])
    .filter((post) => typeof post.slug === "string")
    .map((post) => ({
      _id: post._id,
      title: post.title ?? "Untitled",
      slug: post.slug as string,
      author: post.author ?? "",
      category: post.category ?? "",
      date: post.date ?? "",
    }));

  const entries = buildEntries(categories, totalCount);
  if (!entries.length) return null;

  if (variant === "bar") {
    return <CategoryFilterBar entries={entries} active={category} q={q} />;
  }

  /*
   * Both trees are rendered once, from the same data, and cross-faded by CSS.
   * They are siblings in a single stacking context so neither reflows while the
   * column animates, and the hidden one leaves the accessibility tree via
   * visibility rather than being duplicated into it.
   */
  return (
    <div className="posts-rail-stack">
      <div className="posts-rail-expanded space-y-10">
        <CategoryFilterList entries={entries} active={category} q={q} />

        {/* Headlines need room, so trending belongs to the expanded tree. */}
        {trendingPosts.length > 0 && <TrendingRail posts={trendingPosts} />}
      </div>

      <div className="posts-rail-strip">
        <CategoryFilterStrip entries={entries} active={category} q={q} />
      </div>
    </div>
  );
}
