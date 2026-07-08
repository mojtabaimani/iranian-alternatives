// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/seo'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://iranian-alternatives.ir',
    name: 'Iranian Alternatives',
    description: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.'
  },

  colorMode: {
    disableTransition: true
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  routeRules: {
    '/docs': { redirect: '/docs/overview', prerender: false }
  },

  compatibilityDate: '2026-07-07',

  nitro: {
    prerender: {
      routes: [
        '/',
        '/categories',
        '/blog',
        '/robots.txt',
        '/sitemap.xml'
      ],
      crawlLinks: true
    }
  },

  typescript: {
    strict: false
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
