// schemas/documents/category.ts
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  icon: TagIcon,
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Category Color",
      type: "color",
      description: "Color for category badges and highlights",
    }),
    defineField({
      name: "image",
      title: "Category Image",
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
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Category",
      type: "boolean",
      description: "Display this category prominently in the sidebar",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order of display in category listings (lower numbers first)",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      featured: "featured",
    },
    prepare({ title, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        media,
        subtitle: featured ? "Featured Category" : "",
      };
    },
  },
});