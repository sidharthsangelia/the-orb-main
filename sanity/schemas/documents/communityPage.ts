// schemas/communityPage.ts
import { defineType, defineField } from 'sanity'

export const communityPageSchema = defineType({
  name: 'communityPage',
  title: 'Community Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: '#YouthForPlanet Movement'
        }),
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          initialValue: 'Build the'
        }),
        defineField({
          name: 'secondaryHeading',
          title: 'Secondary Heading',
          type: 'string',
          initialValue: 'Future Together'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: "Join India's most vibrant community of planet-conscious youth transforming climate awareness into actionable change."
        }),
        defineField({
          name: 'joinMovementUrl',
          title: 'Join Movement URL',
          type: 'url',
          initialValue: 'https://forms.google.com/your-form-link'
        }),
        defineField({
          name: 'founderMessageUrl',
          title: 'Founder Message URL',
          type: 'string',
          initialValue: '/founder/message'
        }),
        defineField({
          name: 'impactStats',
          title: 'Impact Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'number'
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string'
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Tree Pine', value: 'TreePine' },
                      { title: 'Users', value: 'Users' },
                      { title: 'Globe', value: 'Globe' },
                      { title: 'Target', value: 'Target' }
                    ]
                  }
                })
              ]
            }
          ],
          initialValue: [
            { value: 12847, label: "Trees Planted", icon: "TreePine" },
            { value: 2500, label: "Youth Connected", icon: "Users" },
            { value: 156, label: "Communities", icon: "Globe" },
            { value: 89, label: "Active Projects", icon: "Target" }
          ]
        })
      ]
    }),

    // Testimonials Section
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Voices of Change'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Real stories from community members making a difference'
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string'
                }),
                defineField({
                  name: 'role',
                  title: 'Role',
                  type: 'string'
                }),
                defineField({
                  name: 'content',
                  title: 'Testimonial Content',
                  type: 'text'
                }),
                defineField({
                  name: 'avatar',
                  title: 'Avatar Initials',
                  type: 'string',
                  validation: Rule => Rule.max(2).required()
                })
              ]
            }
          ],
          initialValue: [
            {
              name: "Arjun Sharma",
              role: "Climate Journalist, Delhi",
              content: "This community gave me the platform to tell stories that matter. My articles on urban sustainability have now reached millions.",
              avatar: "AS"
            },
            {
              name: "Priya Patel",
              role: "Visual Creator, Mumbai",
              content: "From zero followers to 100K+ in 8 months. The mentorship and collaboration opportunities here are unmatched.",
              avatar: "PP"
            },
            {
              name: "Rahul Kumar",
              role: "Community Educator, Bangalore",
              content: "I've conducted workshops in 15 schools this year. The impact we're creating together is beyond anything I imagined.",
              avatar: "RK"
            }
          ]
        })
      ]
    }),

    // Achievements Section
    defineField({
      name: 'achievementsSection',
      title: 'Achievements Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Recognition & Impact'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Our community\'s achievements speak louder than words'
        }),
        defineField({
          name: 'achievements',
          title: 'Achievements',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string'
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string'
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Award', value: 'Award' },
                      { title: 'Trending Up', value: 'TrendingUp' },
                      { title: 'Users 2', value: 'Users2' },
                      { title: 'Light Bulb', value: 'Lightbulb' }
                    ]
                  }
                })
              ]
            }
          ],
          initialValue: [
            {
              title: "Featured in National Media",
              description: "Coverage by leading publications",
              icon: "Award"
            },
            {
              title: "Fastest Growing Community",
              description: "300% growth in 2024",
              icon: "TrendingUp"
            },
            {
              title: "Multi-City Presence",
              description: "Active in 25+ cities",
              icon: "Users2"
            },
            {
              title: "Innovation Award Winner",
              description: "Best Youth Initiative 2024",
              icon: "Lightbulb"
            }
          ]
        })
      ]
    }),

    // Enhanced CTA Section
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Connect With Us'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'The future of our planet is being written right now — and you have a part to play in the story. Whether you\'re a student, educator, creator, or someone who cares, we want to hear from you. Real change begins with conversations, collaborations, and communities like ours.'
        }),
        defineField({
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Let\'s Build Together'
        }),
        defineField({
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Get In Touch'
        }),
        defineField({
          name: 'hashtags',
          title: 'Hashtags',
          type: 'string',
          initialValue: '#YouthforPlanet #CreativeClimateCampaigns'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heroSection.mainHeading'
    },
    prepare({ title }) {
      return {
        title: `Community Page: ${title || 'Untitled'}`
      }
    }
  }
})