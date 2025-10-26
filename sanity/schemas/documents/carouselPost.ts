import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "carouselPost",
  title: "Carousel Post",
  icon: ImagesIcon,
  type: "document",

  fields: [
    // Title - for internal management
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    // Carousel slides
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
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption (optional, for internal purpose only)",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              description: "Set display order of this slide",
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
                title: title || "Slide",
                subtitle: order ? `Order: ${order}` : "No order",
                media,
              };
            },
          },
        },
      ],
      options: {
        sortable: true, // allows manual drag reordering in studio
      },
      validation: (rule) => rule.required().min(1),
    }),

    // Category reference
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "slides.0.image",
      slideCount: "slides",
    },
    prepare({ title, media, slideCount }) {
      const count = slideCount?.length || 0;
      return {
        title,
        subtitle: `${count} slides`,
        media,
      };
    },
  },
});
