// // app/categories/[slug]/metadata.ts
// import type { Metadata } from 'next';
// import { client } from '@/sanity/lib/client';
// import { categoryWithPostsQuery } from '@/sanity/lib/queries';
// import { urlForImage } from '@/sanity/lib/utils';

// interface CategoryPageProps {
//   params: {
//     slug: string;
//   };
// }

// export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
//   try {
//     const category = await client.fetch(categoryWithPostsQuery, { slug: params.slug });
    
//     if (!category) {
//       return {
//         title: 'Category Not Found',
//         description: 'The requested category could not be found.',
//       };
//     }

//     const title = category.seo?.metaTitle || `${category.title} - Climate Stories & Insights`;
//     const description = category.seo?.metaDescription || 
//       category.description || 
//       `Explore ${category.postCount} climate stories and insights in the ${category.title} category. Discover youth-driven initiatives and environmental solutions.`;

//     const ogImage = category.seo?.ogImage?.asset?.url || 
//       (category.image?.asset?.url ? urlForImage(category.image)?.width(1200).height(630).url() : null);

//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

//     return {
//       title,
//       description,
//       keywords: [
//         category.title,
//         'climate stories',
//         'environmental insights',
//         'sustainability',
//         'youth climate action',
//         'green initiatives'
//       ].join(', '),
//       authors: [{ name: 'Your Organization Name' }],
//       openGraph: {
//         title,
//         description,
//         type: 'website',
//         url: `${baseUrl}/categories/${params.slug}`,
//         siteName: 'Your Site Name',
//         images: ogImage ? [{
//           url: ogImage,
//           width: 1200,
//           height: 630,
//           alt: category.title,
//         }] : [],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title,
//         description,
//         images: ogImage ? [ogImage] : [],
//       },
//       alternates: {
//         canonical: `${baseUrl}/categories/${params.slug}`,
//       },
//       robots: {
//         index: true,
//         follow: true,
//         googleBot: {
//           index: true,
//           follow: true,
//           'max-video-preview': -1,
//           'max-image-preview': 'large',
//           'max-snippet': -1,
//         },
//       },
//     };
//   } catch (error) {
//     console.error('Error generating metadata for category:', error);
//     return {
//       title: 'Category - Climate Stories',
//       description: 'Discover climate stories and environmental insights.',
//     };
//   }
// }

// // Generate static params for static site generation
// export async function generateStaticParams() {
//   try {
//     const categories = await client.fetch(`
//       *[_type == "category" && defined(slug.current)] {
//         "slug": slug.current
//       }
//     `);

//     return categories.map((category: { slug: string }) => ({
//       slug: category.slug,
//     }));
//   } catch (error) {
//     console.error('Error generating static params for categories:', error);
//     return [];
//   }
// }

