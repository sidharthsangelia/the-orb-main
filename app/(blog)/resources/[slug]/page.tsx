// // app/resources/[type]/[slug]/page.tsx
// import { notFound } from "next/navigation";
// import { sanityFetch } from "@/sanity/lib/fetch";
// import CustomPortableText from "@/components/portable-text";
// import { urlForImage } from "@/sanity/lib/utils";
// import { defineQuery } from "next-sanity";
// import { format, parseISO } from "date-fns"; // Add date-fns import

// // GROQ query to fetch a single resource by type and slug
// export const resourceDetailQuery = defineQuery(`
//   *[_type == "post" && categories[]->slug.current match $type && slug.current == $slug][0] {
//     _id,
//     title,
//     slug,
//     content,
//     excerpt,
//     coverImage {
//       asset-> {
//         url,
//         metadata {
//           lqip
//         }
//       },
//       alt
//     },
//     author-> {
//       name,
//       picture
//     },
//     date,
//     categories[]-> {
//       title,
//       slug
//     },
//     readingTime
//   }
// `);

// interface ResourceDetailPageProps {
//   params: { type: string; slug: string };
// }

// export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
//   const resource = await sanityFetch({
//     query: resourceDetailQuery,
//     params: { type: params.type, slug: params.slug },
//   });

//   if (!resource) {
//     notFound();
//   }
// console.log(resource.content);
//   return (
//     <div className="min-h-screen bg-[#0c0d0d] text-[#eae4d2]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
//         {resource.coverImage && (
//           <img
//             src={urlForImage(resource.coverImage)?.url()}
//             alt={resource.coverImage.alt || resource.title}
//             className="w-full h-64 object-cover rounded-lg mb-6"
//           />
//         )}
//         <div className="mb-6 text-[#eae4d2]/80">
//           <p>By {resource.author?.name || "Anonymous"}</p>
//           <p>{format(parseISO(resource.date), "MMM d, yyyy")}</p> {/* Use date-fns */}
//           {resource.readingTime && <p>{resource.readingTime} min read</p>}
//         </div>
//         <div className="prose prose-invert max-w-none">
//           <CustomPortableText value={resource.content} />
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
