import { defineField, defineType } from 'sanity'

export const founderMessage = defineType({
  name: 'founderMessage',
  title: 'Founder Message',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
      description: 'Main heading for the founder message page'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL slug for the page'
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full name of the founder'
    }),
    defineField({
      name: 'founderTitle',
      title: 'Founder Title/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Founder\'s position/title (e.g., Founder, The Órb)'
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required(),
          description: 'Important for SEO and accessibility'
        }
      ],
      validation: (Rule) => Rule.required(),
      description: 'Professional photo of the founder'
    }),
    defineField({
      name: 'message',
      title: 'Founder Message Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: (Rule) => Rule.required(),
      description: 'The main founder message content - write the full story here'
    }),
    defineField({
      name: 'featuredQuote',
      title: 'Featured Quote',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          validation: (Rule) => Rule.required(),
          description: 'The inspirational quote to highlight'
        },
        {
          name: 'showQuote',
          title: 'Show Quote Section',
          type: 'boolean',
          initialValue: true,
          description: 'Toggle to show/hide the quote section'
        }
      ],
      description: 'Highlighted quote to feature prominently at the end'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Title for search engines (60 chars max)'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
          description: 'Description for search engines (160 chars max)'
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image for social media sharing'
        }
      ],
      description: 'Search engine optimization settings'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      description: 'When this message was published'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this founder message'
    })
  ],
  preview: {
    select: {
      title: 'title',
      founderName: 'founderName',
      media: 'founderImage',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, founderName, isActive } = selection
      return {
        title: title || 'Founder Message',
        subtitle: `by ${founderName || 'Unknown'} ${isActive ? '✅' : '❌'}`,
        media: selection.media
      }
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
})