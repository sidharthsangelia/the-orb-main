import { defineField, defineType } from 'sanity'
 

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'logo',
      title: 'Organization Logo (PNG)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Upload a high-quality transparent PNG logo.',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text for Logo',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Describe the logo for accessibility and SEO.',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).required(),
      description: 'Link to the organization’s official website.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Optional: A short note about the organization or partnership.',
    }),
    defineField({
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Optional: Lower numbers show first (e.g., 1, 2, 3...).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'website',
    },
  },
})
