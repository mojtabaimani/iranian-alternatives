<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const { data: navigation } = await useAsyncData('navigation', async () => {
  const [categories, about] = await Promise.all([
    queryCollectionNavigation('categories'),
    queryCollectionNavigation('about')
  ])

  return [...categories, ...about]
}, { default: () => [] })

const { data: files } = useLazyAsyncData('search', async () => {
  const [categories, about] = await Promise.all([
    queryCollectionSearchSections('categories'),
    queryCollectionSearchSections('about')
  ])

  return [...categories, ...about]
}, { default: () => [], server: false })

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
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
