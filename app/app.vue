<script setup lang="ts">
const colorMode = useColorMode()
const { seo } = useAppConfig()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

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
  titleTemplate: `%s - ${seo?.siteName}`,
  description: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  ogSiteName: seo?.siteName,
  ogTitle: seo?.siteName,
  ogDescription: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.',
  twitterCard: 'summary_large_image',
  twitterTitle: seo?.siteName,
  twitterDescription: 'Find Iranian alternatives for digital services and products, including cloud services, SaaS products and more. Support local businesses and ensure data compliance.'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
