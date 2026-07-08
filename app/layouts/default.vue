<script setup lang="ts">
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
  <div>
    <AppHeader />

    <UMain>
      <slot />
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>
