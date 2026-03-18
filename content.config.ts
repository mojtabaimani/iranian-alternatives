import { defineCollection, z } from '@nuxt/content'

const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  size: sizeEnum.optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum.optional(),
  variant: z.string().optional()
})

export const collections = {
  index: defineCollection({
    source: '0.index.yml',
    type: 'page',
    schema: z.object({
      hero: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        links: z.array(createLinkSchema()).optional()
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
      features: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        items: z.array(z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
          to: z.string().optional()
        })).optional()
      }).optional(),
      cta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        links: z.array(createLinkSchema()).optional()
      }).optional()
    })
  }),
  docs: defineCollection({
    source: '1.docs/**/*',
    type: 'page'
  }),
  categories: defineCollection({
    source: '5.categories/*.yml',
    type: 'data',
    schema: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      icon: z.string().optional(),
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
