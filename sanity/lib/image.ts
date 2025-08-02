import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  source: SanityImageSource,
  options: {
    width?: number
    height?: number
    quality?: number
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
    crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy'
    auto?: 'format'
  } = {}
) {
  let imageBuilder = builder.image(source)

  if (options.width) imageBuilder = imageBuilder.width(options.width)
  if (options.height) imageBuilder = imageBuilder.height(options.height)
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality)
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit)
  if (options.crop) imageBuilder = imageBuilder.crop(options.crop)
  if (options.auto) imageBuilder = imageBuilder.auto(options.auto)

  return imageBuilder.url()
}