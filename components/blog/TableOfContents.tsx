"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

import { MIN_HEADINGS, type ArticleHeading } from "@/lib/portable-text";
import { cn } from "@/lib/utils";

/**
 * Section outline for long-form articles.
 *
 * Sticky rail on desktop, a collapsible <details> on mobile so it costs one
 * line of vertical space instead of pushing the article below the fold.
 */
export default function TableOfContents({
  headings,
  variant,
  className,
}: {
  headings: ArticleHeading[];
  /**
   * Rendered once per breakpoint rather than once with both trees: emitting
   * both would duplicate every anchor in the accessibility tree, and two
   * elements would claim the same `aria-current` at the same time.
   */
  variant: "inline" | "rail";
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    /*
     * The bottom margin keeps the "active" band in the upper third of the
     * viewport. Without it every heading below the fold counts as visible and
     * the highlight jumps to the last one as soon as a short article loads.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < MIN_HEADINGS) return null;

  const list = (
    <ul className="space-y-1 text-sm">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? "location" : undefined}
            className={cn(
              "block border-l-2 py-1.5 pr-2 transition-colors",
              heading.level === 3 ? "pl-7" : "pl-4",
              activeId === heading.id
                ? "border-brand-accent font-medium text-foreground"
                : "border-border text-muted-foreground hover:border-brand-accent/50 hover:text-foreground",
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "inline") {
    // Mobile: collapsed by default so it costs one line above the article.
    return (
      <details className={cn("group rounded-xl border border-border bg-card/50", className)}>
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold">
          <List className="h-4 w-4 text-brand-accent" aria-hidden="true" />
          In this article
          <span className="ml-auto text-xs font-normal text-muted-foreground group-open:hidden">
            {headings.length} sections
          </span>
        </summary>
        <nav aria-label="Article sections" className="px-4 pb-4">
          {list}
        </nav>
      </details>
    );
  }

  // Desktop: sticky rail in the grid gutter beside the text column.
  return (
    <nav aria-label="Article sections" className={cn("sticky top-28", className)}>
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <List className="h-4 w-4 text-brand-accent" aria-hidden="true" />
        In this article
      </p>
      {list}
    </nav>
  );
}
