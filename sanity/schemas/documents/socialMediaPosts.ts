// schemas/socialMediaPosts.js
const socialMediaPosts = {
  name: 'socialMediaPosts',
  title: 'Social Media Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this social media collection',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'instagramPosts',
      title: 'Instagram Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'instagramPost',
          title: 'Instagram Post',
          fields: [
            {
              name: 'embedUrl',
              title: 'Instagram Embed URL',
              type: 'text',
              description: 'Instagram post embed URL (e.g., https://www.instagram.com/p/POST_ID/embed)',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'fallbackDescription',
              title: 'Fallback Description',
              type: 'text',
              description: 'Description to show if embed fails to load',
              validation: (Rule) => Rule.required().max(200)
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Show this post on the website',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'fallbackDescription',
              subtitle: 'embedUrl'
            }
          }
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 Instagram posts allowed')
    },
    {
      name: 'linkedinPosts',
      title: 'LinkedIn Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'linkedinPost',
          title: 'LinkedIn Post',
          fields: [
            {
              name: 'embedUrl',
              title: 'LinkedIn Embed URL',
              type: 'text',
              description: 'LinkedIn post embed URL',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'fallbackDescription',
              title: 'Fallback Description',
              type: 'text',
              description: 'Description to show if embed fails to load',
              validation: (Rule) => Rule.required().max(200)
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Show this post on the website',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'fallbackDescription',
              subtitle: 'embedUrl'
            }
          }
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 LinkedIn posts allowed')
    },
    {
      name: 'twitterPosts',
      title: 'Twitter Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'twitterPost',
          title: 'Twitter Post',
          fields: [
            {
              name: 'embedUrl',
              title: 'Twitter/X Embed URL',
              type: 'text',
              description: 'Twitter/X post embed URL',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'fallbackDescription',
              title: 'Fallback Description',
              type: 'text',
              description: 'Description to show if embed fails to load',
              validation: (Rule) => Rule.required().max(200)
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Show this post on the website',
              initialValue: true
            }
          ],
          preview: {
            select: {
              title: 'fallbackDescription',
              subtitle: 'embedUrl'
            }
          }
        }
      ],
      validation: (Rule) => Rule.max(3).error('Maximum 3 Twitter posts allowed')
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated'
    },
    prepare(selection) {
      const { title, lastUpdated } = selection;
      return {
        title: title || 'Social Media Posts',
        subtitle: lastUpdated 
          ? `Updated: ${new Date(lastUpdated).toLocaleDateString()}` 
          : 'No update date'
      };
    }
  }
};

export default socialMediaPosts;