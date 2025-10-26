import { Carousel_002 } from "@/components/ui/skiper-ui/skiper48";
import { client } from "@/sanity/lib/client";

// --- Define TypeScript types for your data shape ---
interface Slide {
  src: string;
  alt: string;
}

interface CarouselPost {
  _id: string;
  title: string;
  category?: string;
  slides: Slide[];
}

// --- GROQ query with explicit projection ---
const query = `*[_type == "carouselPost"] | order(_createdAt desc)[0...3]{
  _id,
  title,
  "category": category->title,
  slides[]{
    "src": image.asset->url,
    "alt": caption
  }
}`;

export default async function CarouselPosts() {
  // 👇 Type inference for the fetch result
  const posts = await client.fetch<CarouselPost[]>(query);

  if (!posts?.length) return null;

  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {posts.map((post) => (
          <div key={post._id} className="space-y-3">
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <h2 className="font-semibold">Carousel Post</h2>
              {post.category && (
                <p className="text-sm text-gray-500">{post.category}</p>
              )}
            </div>

            <Carousel_002
              images={post.slides}
              showPagination
              showNavigation
              loop
              autoplay
              spaceBetween={40}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
