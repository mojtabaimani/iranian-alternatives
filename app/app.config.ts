export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    button: {
      default: {
        size: 'md'
      }
    },
    input: {
      default: {
        size: 'md'
      }
    },
    card: {
      rounded: 'rounded-xl'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    }
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/mojtabaimani/iranian-alternatives/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/mojtabaimani/iranian-alternatives',
        target: '_blank'
      }]
    }
  },
  seo: {
    siteName: 'Iranian Alternatives'
  }
})
