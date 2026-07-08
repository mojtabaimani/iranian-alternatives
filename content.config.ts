import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const linkSchema = z.object({
  label: z.string(),
  to: z.string().optional(),
  icon: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional()
})

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'data',
      source: '0.index.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        hero: z.object({
          title: z.string(),
          description: z.string(),
          links: z.array(linkSchema).optional()
        }).optional(),
        // Featured-services logo strip under the hero. Services are referenced
        // by name; logo and category link are resolved from the `categories`
        // collection in app/pages/index.vue so logos are not duplicated here.
        logos: z.object({
          title: z.string().optional(),
          services: z.array(z.string()).optional()
        }).optional(),
        sections: z.array(z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          align: z.string().optional(),
          features: z.array(z.object({
            name: z.string(),
            description: z.string(),
            icon: z.string().optional()
          })).optional()
        })).optional(),
        // Category cards on the homepage are rendered from the `categories`
        // collection (see app/pages/index.vue), not from this YAML. Only the
        // section heading lives here.
        features: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          links: z.array(linkSchema).optional()
        }).optional(),
        cta: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          links: z.array(linkSchema).optional()
        }).optional()
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: '1.docs/**/*.md'
    }),
    blogLanding: defineCollection({
      type: 'data',
      source: '3.blog.yml',
      schema: z.object({
        title: z.string(),
        description: z.string()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: '3.blog/**/*.md',
      schema: z.object({
        date: z.string(),
        image: z.object({
          src: z.string()
        }).optional(),
        badge: z.object({
          label: z.string(),
          color: z.string().optional()
        }).optional(),
        authors: z.array(z.object({
          name: z.string(),
          description: z.string().optional(),
          to: z.string().optional(),
          avatar: z.object({
            src: z.string()
          }).optional()
        })).optional()
      })
    }),
    categories: defineCollection({
      type: 'page',
      source: '5.categories/*.yml',
      schema: z.object({
        icon: z.string().optional(),
        // Short label for the homepage category card; falls back to `description`
        tagline: z.string().optional(),
        services: z.array(z.object({
          name: z.string(),
          description: z.string().optional(),
          logo: z.string().optional(),
          website: z.string().optional(),
          location: z.string().optional(),
          flag: z.string().optional(),
          tags: z.array(z.string()).optional()
        })).optional()
      })
    })
  }
})
