/**
 * The URL is the source of truth for the archive's state.
 *
 * The previous page held page number, search text and category in React state,
 * so a filtered view could not be linked, bookmarked, shared or reached with
 * the back button, and a crawler only ever saw an empty shell. Everything here
 * is deliberately framework-free so the server page and the client filter
 * island can agree on one encoding.
 */

export const POSTS_PER_PAGE = 12;

export type PostsIndexParams = {
  page: number;
  category: string;
  q: string;
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function parsePostsIndexParams(
  searchParams: RawSearchParams = {},
): PostsIndexParams {
  const page = Number.parseInt(firstValue(searchParams.page), 10);

  return {
    // Anything non-numeric, negative or absent lands on page 1 rather than
    // producing an offset of NaN, which GROQ would reject outright.
    page: Number.isFinite(page) && page > 0 ? page : 1,
    category: firstValue(searchParams.category),
    q: firstValue(searchParams.q),
  };
}

/**
 * GROQ `match` needs a glob, and an unescaped one lets a reader's punctuation
 * change the shape of the query. Strip everything that is not a word character
 * or a space, then suffix a star so "wetl" still finds "wetlands".
 */
export function toGroqMatch(q: string): string {
  const cleaned = q.replace(/[^\p{L}\p{N}\s]/gu, " ").trim();
  if (!cleaned) return "";
  return `${cleaned}*`;
}

/** Serialises state back to a URL, dropping defaults so links stay readable. */
export function postsIndexHref(
  params: Partial<PostsIndexParams> & { page?: number },
): string {
  const search = new URLSearchParams();

  if (params.category) search.set("category", params.category);
  if (params.q) search.set("q", params.q);
  if (params.page && params.page > 1) search.set("page", String(params.page));

  const query = search.toString();
  return query ? `/posts?${query}` : "/posts";
}

export function totalPages(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}
