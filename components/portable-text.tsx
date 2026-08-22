/**
 * Renders a post body from Portable Text.
 *
 * https://www.sanity.io/docs/block-content
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { Image } from "next-sanity/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/utils";
import { headingId } from "@/lib/portable-text";
import { cn } from "@/lib/utils";

/** Anchor target that also offers a click-to-copy affordance on hover. */
function Heading({
  as: Tag,
  value,
  className,
  children,
}: {
  as: "h2" | "h3" | "h4";
  value: any;
  className: string;
  children: React.ReactNode;
}) {
  const id = value?._key ? headingId(value._key) : undefined;
  return (
    <Tag id={id} className={cn("scroll-mt-32 group", className)}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 text-brand-accent opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 no-underline"
        >
          #
        </a>
      )}
    </Tag>
  );
}

const components: PortableTextComponents = {
  types: {
    /*
     * The post schema allows images with alt + caption inside the body, but
     * no serializer existed for them — every inline image an editor placed
     * fell through to the unknown-type fallback and rendered nothing.
     */
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1600).fit("max").url();
      if (!url) return null;

      return (
        <figure className="not-prose my-10">
          <Image
            src={url}
            alt={value?.alt || ""}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="h-auto w-full rounded-xl border border-border/60 object-cover"
          />
          {value?.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    // Body h1 is folded to h2 — the article title owns the page's only h1.
    h1: (props) => (
      <Heading as="h2" value={props.value} className="mt-14 text-3xl font-bold tracking-tight sm:text-4xl">
        {props.children}
      </Heading>
    ),
    h2: (props) => (
      <Heading as="h2" value={props.value} className="mt-14 text-2xl font-bold tracking-tight sm:text-3xl">
        {props.children}
      </Heading>
    ),
    h3: (props) => (
      <Heading as="h3" value={props.value} className="mt-10 text-xl font-semibold tracking-tight sm:text-2xl">
        {props.children}
      </Heading>
    ),
    h4: (props) => (
      <Heading as="h4" value={props.value} className="mt-8 text-lg font-semibold tracking-tight">
        {props.children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className="not-prose my-10 border-l-4 border-brand-accent bg-muted/50 px-6 py-5 text-lg font-medium italic leading-relaxed text-foreground sm:text-xl">
        {children}
      </blockquote>
    ),
  },

  marks: {
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-[0.9em] font-medium text-brand-accent before:content-none after:content-none">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href ?? "";
      // Internal links stay client-side; external ones get the safe rel pair.
      const isExternal = /^https?:\/\//i.test(href) && !href.includes("theorbearth.in");

      const className =
        "font-medium text-brand-accent underline decoration-brand-accent/40 underline-offset-4 transition-colors hover:decoration-brand-accent";

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
            {children}
          </a>
        );
      }

      return (
        <Link href={href || "#"} className={className}>
          {children}
        </Link>
      );
    },
  },
};

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  return (
    <div className={cn("prose", className)}>
      <PortableText components={components} value={value} />
    </div>
  );
}
