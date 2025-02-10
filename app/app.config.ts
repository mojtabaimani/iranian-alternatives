export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-(--ui-border)',
        left: 'text-sm text-(--ui-text-muted)'
      }
    }
  },
  seo: {
    siteName: 'Iranian Alternatives'
  },
  header: {
    title: 'Iranian Alternatives',
    to: '/',
    showTitle: true,
    showLogo: true,
    titleClass: 'ml-2 font-bold text-lg', // Style the title
    logo: {
      alt: 'Iranian Alternatives Logo',
      light: '/logo/iran.svg',
      dark: '/logo/iran.svg',
      class: 'h-9 w-9' // Control logo size
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/mojtabaimani/iranian-alternatives',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} Iranian Alternatives`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/mojtabaimani/iranian-alternatives',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
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
  }
})
