// /schemas/socialMediaPosts.js
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
      validation: Rule => Rule.required()
    },
    {
      name: 'showInstagram',
      title: 'Show Instagram Section',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'showLinkedin',
      title: 'Show LinkedIn Section',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'showTwitter',
      title: 'Show Twitter Section',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'instagramPosts',
      title: 'Instagram Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'embedHtml',
              title: 'Instagram Embed HTML',
              type: 'text',
              description: 'Paste the full Instagram embed HTML code here',
              validation: Rule => Rule.required()
            },
            {
              name: 'fallbackDescription',
              title: 'Fallback Description',
              type: 'text',
              validation: Rule => Rule.required().max(200)
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    },
    {
      name: 'linkedinPosts',
      title: 'LinkedIn Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'embedHtml',
              title: 'LinkedIn Embed HTML',
              type: 'text',
              description: 'Paste the full LinkedIn embed HTML code here',
              validation: Rule => Rule.required()
            },
            {
              name: 'fallbackDescription',
              title: 'Fallback Description',
              type: 'text',
              validation: Rule => Rule.required().max(200)
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    },
    {
      name: 'twitterPosts',
      title: 'Twitter Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'embedHtml',
              title: 'Twitter Embed HTML',
              type: 'text',
              description: 'Paste the full Twitter embed HTML code here',
              validation: Rule => Rule.required()
            },
            {
              name: 'fallbackDescription',
              title: 'Fallback Description',
              type: 'text',
              validation: Rule => Rule.required().max(200)
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }
  ]
};

export default socialMediaPosts;
