"use client";

import { useCallback, useEffect, useState } from "react";
import { PanelLeftClose } from "lucide-react";

const STORAGE_KEY = "orb:posts-rail";
const ATTRIBUTE = "postsRail";

/**
 * Flips `data-posts-rail` on <html>; every visual consequence lives in CSS (see
 * globals.css), which is what lets a remembered collapse apply before hydration
 * without React needing to know about it on the server.
 */
export function PostsRailToggle() {
  const [collapsed, setCollapsed] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset[ATTRIBUTE] === "collapsed",
  );

  /*
   * Two toggles exist at once — one in the expanded list, one in the collapsed
   * strip — and only CSS knows which is visible. A plain local state would let
   * the hidden one drift out of sync and announce the wrong thing the moment it
   * became visible, so both observe the attribute they share.
   */
  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setCollapsed(root.dataset[ATTRIBUTE] === "collapsed");

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-posts-rail"],
    });

    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset[ATTRIBUTE] !== "collapsed";

    if (next) {
      root.dataset[ATTRIBUTE] = "collapsed";
    } else {
      delete root.dataset[ATTRIBUTE];
    }

    try {
      localStorage.setItem(STORAGE_KEY, next ? "collapsed" : "expanded");
    } catch {
      // Private-mode Safari throws on write; the toggle should still work.
    }
  }, []);

  const label = collapsed ? "Expand topics" : "Collapse topics";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={!collapsed}
      aria-controls="posts-topics-rail"
      aria-label={label}
      title={label}
      /*
       * The pre-paint script may already have collapsed the rail, so the
       * client's first render can legitimately disagree with the server's. It
       * is an aria attribute only — nothing visible reflows.
       */
      suppressHydrationWarning
      className="group inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground focus-visible:border-border focus-visible:bg-muted focus-visible:text-foreground active:scale-95"
    >
      <PanelLeftClose
        className="posts-rail-toggle-icon h-4 w-4"
        aria-hidden
      />
    </button>
  );
}

/**
 * Runs before hydration so a remembered collapse is already applied on the
 * first frame. Kept inline and dependency-free for the same reason theme
 * scripts are.
 */
export function PostsRailPreference() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{if(localStorage.getItem(${JSON.stringify(
          STORAGE_KEY,
        )})==="collapsed"){document.documentElement.dataset.postsRail="collapsed"}}catch(e){}`,
      }}
    />
  );
}
