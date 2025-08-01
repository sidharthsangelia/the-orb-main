import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Main title of the About page",
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
              title: "Icon (Optional)",
              type: "string",
              description: "Add an emoji or icon name if needed",
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
                rule.required().regex(/^\d{4}$/, {
                  name: "year",
                  invert: false,
                }),
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

    
  ],
});
