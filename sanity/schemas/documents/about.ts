import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    // Page Title & Intro
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Main title of the About page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short impactful line (e.g., 'Building Bridges Between Awareness & Action')",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 4,
      description: "Brief introduction for the organization",
    }),

    // Key Metrics
    defineField({
      name: "stats",
      title: "Key Statistics",
      type: "array",
      description: "Highlight impactful numbers",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string", // e.g. "94%" or "50,000+"
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),

    // Mission
    defineField({
      name: "mission",
      title: "Our Mission",
      type: "text",
      rows: 5,
      description: "Your mission statement",
    }),

    // Vision
    defineField({
      name: "vision",
      title: "Our Vision",
      type: "text",
      rows: 5,
      description: "Your vision statement",
    }),

    // Core Values
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Value Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Lucide Icon Name",
              type: "string",
              description:
                "Enter the Lucide React icon name (e.g., 'Leaf', 'Users', 'Globe'). This will be mapped in the frontend.",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      description: "List of principles and their descriptions",
    }),

    // What We Do
    defineField({
      name: "whatWeDo",
      title: "What We Do",
      type: "array",
      of: [
        {
          type: "object",
          name: "activity",
          fields: [
            defineField({
              name: "title",
              title: "Activity Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Activity Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Lucide Icon Name",
              type: "string",
              description:
                "Enter the Lucide React icon name (e.g., 'BookOpen', 'Camera', 'Users').",
            }),
          ],
        },
      ],
    }),

    // Timeline / Journey
    defineField({
      name: "journey",
      title: "Our Journey",
      type: "array",
      of: [
        {
          type: "object",
          name: "milestone",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              validation: (rule) =>
                rule.required().regex(/^\d{4}$/, { name: "year" }),
            }),
            defineField({
              name: "title",
              title: "Milestone Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Milestone Description",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
    }),

    // SEO Fields
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Meta title for search engines",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Meta description for search engines",
    }),
  ],
});
