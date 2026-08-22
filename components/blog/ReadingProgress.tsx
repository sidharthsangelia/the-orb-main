"use client";

import { useEffect, useState } from "react";

/**
 * Progress through the article body, pinned under the fixed header.
 *
 * Measures the element it is told to track rather than the whole document, so
 * the bar reads 100% at the end of the article — not after the reader has also
 * scrolled past the author card, related grid and newsletter block.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Purely decorative feedback — skip the scroll work entirely if the
    // reader has asked for reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, height } = target.getBoundingClientRect();
      const scrolled = -top;
      const distance = height - window.innerHeight;

      if (distance <= 0) {
        setProgress(scrolled > 0 ? 100 : 0);
        return;
      }

      setProgress(Math.min(100, Math.max(0, (scrolled / distance) * 100)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-header z-40 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-brand to-brand-accent transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
