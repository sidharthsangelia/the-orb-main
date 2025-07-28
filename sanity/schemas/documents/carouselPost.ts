// schemas/documents/carouselPost.ts
import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "carouselPost",
  title: "Carousel Post",
  icon: ImagesIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",  
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slides",
      title: "Carousel Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "slide",
          title: "Slide",
          fields: [
            defineField({
              name: "image",
              title: "Slide Image",
              type: "image",
              options: {
                hotspot: true,
                accept: 'image/*'
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                  validation: (rule) => rule.required(),
                },
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              description: "Order of this slide in the carousel",
            }),
          ],
          preview: {
            select: {
              title: "caption",
              media: "image",
              order: "order",
            },
            prepare({ title, media, order }) {
              return {
                title: title || "Untitled Slide",
                subtitle: `Slide ${order || "No order"}`,
                media,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Overall description of the carousel content",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "platforms",
      title: "Posted On Platforms",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Twitter", value: "twitter" },
          { title: "Facebook", value: "facebook" },
        ],
      },
      description: "Which social platforms was this posted on?",
    }),
    defineField({
      name: "engagement",
      title: "Engagement Stats",
      type: "object",
      fields: [
        defineField({
          name: "likes",
          title: "Likes",
          type: "number",
        }),
        defineField({
          name: "comments",
          title: "Comments",
          type: "number",
        }),
        defineField({
          name: "shares",
          title: "Shares",
          type: "number",
        }),
      ],
      description: "Track engagement from social platforms",
    }),
    defineField({
      name: "featured",
      title: "Featured Carousel",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "slides.0.image",
      slideCount: "slides",
    },
    prepare({ title, subtitle, media, slideCount }) {
      const count = slideCount?.length || 0;
      return {
        title,
        subtitle: `${count} slides - ${subtitle || ""}`,
        media,
      };
    },
  },
});