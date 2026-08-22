import type { PortableTextBlock } from "next-sanity";

/**
 * Below this an outline is noise rather than navigation.
 *
 * Declared here, not in the (client) TableOfContents component: exports from a
 * "use client" module arrive in a server component as client references rather
 * than plain values, so the comparison would silently always be false.
 */
export const MIN_HEADINGS = 2;

export type ArticleHeading = {
  /** Stable across renders because it comes from Sanity's own block key. */
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Anchor id for a body heading.
 *
 * Derived from the block's Sanity `_key` rather than its text: two headings
 * reading "Background" in the same article would otherwise produce the same
 * anchor, and the table of contents would scroll both entries to the first one.
 */
export function headingId(key: string): string {
  return `section-${key}`;
}

const HEADING_STYLES = new Set(["h1", "h2", "h3", "h4"]);

/**
 * Flattens a Portable Text body into the heading outline the table of
 * contents renders. Body `h1` is folded into level 2 — the page title already
 * owns the document's only `h1`, and editors reach for h1 out of habit.
 */
export function extractHeadings(
  blocks: PortableTextBlock[] | null | undefined,
): ArticleHeading[] {
  if (!blocks?.length) return [];

  const headings: ArticleHeading[] = [];

  for (const block of blocks) {
    if (block._type !== "block") continue;

    const style = typeof block.style === "string" ? block.style : "";
    if (!HEADING_STYLES.has(style)) continue;

    const text = (block.children ?? [])
      .filter((child: any) => child._type === "span")
      .map((child: any) => child.text ?? "")
      .join("")
      .trim();

    if (!text) continue;

    headings.push({
      id: headingId(block._key as string),
      text,
      level: style === "h1" || style === "h2" ? 2 : 3,
    });
  }

  return headings;
}
