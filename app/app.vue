<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Iranian Alternatives',
  description: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  ogImage: '/flag/iranianflagflying.png',
  ogDescription: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  twitterImage: '/flag/iranianflagflying.png',
  twitterDescription: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  twitterCard: 'summary_large_image'
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || []
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

const links = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Categories',
  icon: 'i-lucide-grid',
  to: '/#categories'
}, {
  label: 'Docs',
  icon: 'i-lucide-book',
  to: '/docs/overview'
}]

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
