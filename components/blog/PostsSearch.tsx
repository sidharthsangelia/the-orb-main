"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, X } from "lucide-react";
import { postsIndexHref } from "@/lib/posts-index";

interface PostsSearchProps {
  /** Current query, straight from the URL — this input is not the state owner. */
  q: string;
  category: string;
}

const DEBOUNCE_MS = 350;

export function PostsSearch({ q, category }: PostsSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(q);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  /*
   * The URL wins whenever it changes underneath us — a back button press, or a
   * "clear filters" link elsewhere on the page. Without this the box would keep
   * showing a query the results no longer reflect.
   */
  useEffect(() => setValue(q), [q]);

  useEffect(() => {
    if (value === q) return;

    const timer = setTimeout(() => {
      startTransition(() => {
        // scroll: false keeps the reader's eye where it is while results swap;
        // typing is not navigation in the usual sense.
        router.push(postsIndexHref({ q: value, category, page: 1 }), {
          scroll: false,
        });
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, q, category, router]);

  const clear = () => {
    setValue("");
    startTransition(() => {
      router.push(postsIndexHref({ category, page: 1 }), { scroll: false });
    });
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      // Enter should commit immediately rather than wait out the debounce, and
      // must never reload the page.
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(() => {
          router.push(postsIndexHref({ q: value, category, page: 1 }), {
            scroll: false,
          });
        });
      }}
      className="relative mx-auto w-full max-w-xl"
    >
      <label htmlFor="posts-search" className="sr-only">
        Search stories
      </label>

      <Search
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />

      <input
        id="posts-search"
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search stories, topics, authors…"
        autoComplete="off"
        className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-11 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-brand/50 focus:ring-4 focus:ring-brand/10 [&::-webkit-search-cancel-button]:hidden"
      />

      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
        {isPending ? (
          <Loader2
            aria-hidden
            className="h-4 w-4 animate-spin text-muted-foreground"
          />
        ) : (
          value && (
            <button
              type="button"
              onClick={clear}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
              <span className="sr-only">Clear search</span>
            </button>
          )
        )}
      </div>

      <output aria-live="polite" className="sr-only">
        {isPending ? "Searching stories" : ""}
      </output>
    </form>
  );
}
