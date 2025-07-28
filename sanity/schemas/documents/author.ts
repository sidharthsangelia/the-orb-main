 
import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "picture",
      title: "Profile Picture",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      options: {
        hotspot: true,
        accept: 'image/*',
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Short biography for author pages and post bylines",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Job title or role (e.g., 'Senior Writer', 'Guest Author')",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "website",
          title: "Website",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "github",
          title: "GitHub",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      description: "Contact email (won't be displayed publicly)",
    }),
    defineField({
      name: "featured",
      title: "Featured Author",
      type: "boolean",
      initialValue: false,
      description: "Show this author prominently on the site",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "picture",
    },
  },
});