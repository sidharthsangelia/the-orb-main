import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  /** Heading level, so sections stay in document order. */
  as?: "h2" | "h3";
  className?: string;
  /** Rendered under the description — typically a link or button. */
  action?: React.ReactNode;
}

/**
 * One heading treatment for every landing band. Sections previously each
 * hand-rolled their own sizes, colours and margins, which is what made the
 * page read as a stack of unrelated templates.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
          <span aria-hidden className="h-px w-6 bg-brand-accent/50" />
          {eyebrow}
        </span>
      )}

      <Tag className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </Tag>

      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}

      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
