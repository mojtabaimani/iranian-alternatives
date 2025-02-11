<script setup lang="ts">
const { seo } = useAppConfig()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  description: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  ogSiteName: seo?.siteName,
  ogTitle: seo?.siteName,
  ogDescription: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  ogImage: '/flag/iranianflagflying.png',
  twitterCard: 'summary_large_image',
  twitterTitle: seo?.siteName,
  twitterDescription: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  twitterImage: '/flag/iranianflagflying.png'
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
