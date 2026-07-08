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

// Same hand-built search sections as app/layouts/default.vue: YAML category
// pages have no markdown body for queryCollectionSearchSections to extract.
const { data: files } = useLazyAsyncData('search', async () => {
  const [categories, about] = await Promise.all([
    queryCollection('categories').order('title', 'ASC').all(),
    queryCollectionSearchSections('about').catch(() => [])
  ])

  const categorySections = categories.map(category => ({
    id: category.path,
    title: category.title,
    titles: [],
    level: 1,
    content: [
      category.description,
      category.alternativeTo?.length ? `Alternative to ${category.alternativeTo.join(', ')}` : '',
      (category.services || []).map(service => service.name).join(', ')
    ].filter(Boolean).join('. ')
  }))

  return [...categorySections, ...about]
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
