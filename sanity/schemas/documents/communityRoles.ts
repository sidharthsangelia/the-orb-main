import { defineType, defineField } from "sanity";

export default defineType({
  name: "communityRole",
  title: "Community Role",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Role Key (e.g. creators, journalists)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Role Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "impact",
      title: "Impact Text",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "color",
      title: "Tailwind Gradient Classes",
      type: "string",
      description: "Example: from-blue-500/20 to-purple-500/20",
    }),
    defineField({
      name: "icon",
      title: "Icon Name (from lucide-react)",
      type: "string",
      description: "Example: Camera, PenTool, Mic, BookOpen",
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
