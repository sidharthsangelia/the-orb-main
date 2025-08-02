// components/CarouselSwiper.server.tsx (no "use client")

 
// import { CardSwipe } from "@/components/ui/card-swipe";
// import { sanityFetch } from "@/sanity/lib/fetch";
// import { carouselPostsQuery } from "@/sanity/lib/queries";

// export default async function CarouselSwiperServer() {
//   const [carouselPosts] = await Promise.all([
//     sanityFetch({ query: carouselPostsQuery }),
//   ]);

//   if (!carouselPosts || carouselPosts.length === 0) {
//     return (
//       <div className="w-full text-center py-8 text-muted-foreground">
//         📭 No carousel posts available right now.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//       {carouselPosts
//   .filter((post) => Array.isArray(post.slides) && post.slides.length > 0)
//   .map((post) => {
//     const images = post.slides
//       .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
//       .map((slide) => ({
//         src: slide.image.asset.url,
//         alt: slide.image.alt,
//       }));

//     return (
//       <div key={post._id} className="w-full">
//         <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
//         <CardSwipe images={images} autoplayDelay={2500} slideShadows={false} />
//       </div>
//     );
//   })}
//     </div>
//   );
// }
