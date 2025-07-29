import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ✅ Basic Info
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // ✅ Social Media Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      description: 'Add links to your social media profiles shown in the footer.',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              validation: (rule) => rule.required(),
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Threads', value: 'threads' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Dribbble', value: 'dribbble' },
                ],
              },
            },
            {
              name: 'url',
              type: 'url',
              title: 'Profile URL',
              validation: (rule) => rule.required(),
            },
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.custom((links) => {
          if (!links || !Array.isArray(links)) return true;
          const hasInstagram = links.some(
            (link) =>
              (link as { platform?: string; url?: string }).platform === 'instagram' &&
              !!(link as { url?: string }).url
          );
          return hasInstagram || 'Instagram profile is required.';
        }),
    }),

    // ✅ Contact Info
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: 'email',
          invert: false,
        }).error('Enter a valid email address'),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\+?[0-9\s\-]{7,15}$/, {
          name: 'phone number',
          invert: false,
        }).error('Enter a valid phone number'),
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State / Province',
      type: 'string',
    }),
    defineField({
      name: 'zipCode',
      title: 'ZIP / Postal Code',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Link',
      type: 'url',
      description: 'Optional link to location on Google Maps',
    }),

    // ✅ SEO / Meta
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Used for social media previews (Twitter, Facebook, etc).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility and SEO.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (will show in browser tab)',
    }),
    defineField({
      name: 'metadataBase',
      title: 'Metadata Base URL',
      type: 'url',
      description: 'Base URL used for generating metadata (OG tags, etc.)',
    }),

    // ✅ Footer Text (Rich)
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      description: 'Rich text that will appear at the bottom of every page.',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

