import type { ClientPerspective, QueryParams } from "next-sanity";

import { client } from "@/sanity/lib/client";

/**
 * Used to fetch data in Server Components, it has built in support for handling perspectives.
 * When using the "published" perspective then time-based revalidation is used, set to match the time-to-live on Sanity's API CDN (60 seconds)
 * and will also fetch from the CDN.
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
}) {
  const perspective = _perspective || "published";
  const stega =
    _stega ||
    process.env.VERCEL_ENV === "preview";

  return client.fetch(query, await params, {
    stega,
    perspective: "published",
    useCdn: true,
    next: { revalidate: 60 },
  });
}
