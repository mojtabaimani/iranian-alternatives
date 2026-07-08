export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    pageCard: {
      slots: {
        root: 'rounded-xl'
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
