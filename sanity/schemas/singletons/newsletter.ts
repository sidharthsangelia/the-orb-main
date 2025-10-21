import { defineType, defineField } from "sanity";

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description:
        "Used inside Sanity to identify this newsletter. Not shown in the email.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subject",
      title: "Email Subject",
      type: "string",
      description:
        "This will be the subject line that appears in the subscriber’s inbox.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Email Content",
      type: "array",
      description: "Write the body of your newsletter here.",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "Track where this newsletter is in the workflow.",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Sent", value: "sent" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
 
  ],
});
