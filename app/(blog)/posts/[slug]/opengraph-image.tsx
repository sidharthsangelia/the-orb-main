// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

// Image metadata
export const alt = 'The Órb Blog Post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type Props = {
  params: { slug: string }
}

export default async function Image({ params }: Props) {
  // Fetch the post data
  const post = await sanityFetch({ 
    query: postQuery, 
    params, 
    stega: false 
  });

  if (!post) {
    // Fallback if post not found
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}
        >
          The Órb Blog
        </div>
      ),
      { ...size }
    );
  }

  // Get the cover image URL
  const coverImageUrl = post.coverImage 
    ? urlForImage(post.coverImage)?.width(1200).height(630).fit('crop').url()
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#1a1a1a',
        }}
      >
        {/* Background Image */}
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt=""
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        
        {/* Dark overlay for better text readability */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        
        {/* Content Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px',
            color: 'white',
          }}
        >
          {/* The Órb Logo/Brand */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            The Órb
          </div>
          
          {/* Post Title */}
          <h1
            style={{
              fontSize: post.title.length > 60 ? 48 : 56,
              fontWeight: 'bold',
              lineHeight: 1.2,
              margin: 0,
              marginBottom: '20px',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              maxWidth: '100%',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {post.title}
          </h1>
          
          {/* Author and Date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {post.author?.name && (
              <>
                <span>By {post.author.name}</span>
                <span>•</span>
              </>
            )}
            {post.date && (
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}