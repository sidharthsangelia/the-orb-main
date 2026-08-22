import type { ClientPerspective, QueryParams } from "next-sanity";
import type { ClientReturn } from "@sanity/client";

import { client } from "@/sanity/lib/client";

/**
 * Used to fetch data in Server Components, it has built in support for handling perspectives.
 * When using the "published" perspective then time-based revalidation is used, set to match the time-to-live on Sanity's API CDN (60 seconds)
 * and will also fetch from the CDN.
 *
 * The return type is resolved through ClientReturn rather than left to
 * inference. Typegen writes its query-to-result map into `@sanity/client`, but
 * `next-sanity` resolves its own nested copy of that package, so the two are
 * different modules to TypeScript and the augmentation never reaches the
 * client's own `fetch` signature — every result would silently widen to `any`.
 * Naming the map's module here keeps the generated types attached no matter how
 * the dependency tree hoists.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  perspective: _perspective,
  stega: _stega,
}: {
  query: QueryString;
  params?: QueryParams | Promise<QueryParams>;
  perspective?: Omit<ClientPerspective, "raw">;
  stega?: boolean;
}): Promise<ClientReturn<QueryString>> {
  const perspective = _perspective || "published";
  const stega =
    _stega ||
    process.env.VERCEL_ENV === "preview";

  return client.fetch(query, await params, {
    stega,
    perspective: "published",
    useCdn: true,
    next: { revalidate: 60 },
  }) as Promise<ClientReturn<QueryString>>;
}
