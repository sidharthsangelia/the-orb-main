import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines (50-60 characters recommended)",
      validation: (rule) => rule.max(60).warning("Keep under 60 characters for better SEO"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Description for search engines (150-160 characters recommended)",
      validation: (rule) => rule.max(160).warning("Keep under 160 characters for better SEO"),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Image shown when shared on social media (1200x630px recommended)",
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
      name: "keywords",
      title: "Focus Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Main keywords for this content",
    }),
  ],
});