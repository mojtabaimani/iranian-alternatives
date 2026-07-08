<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', async () => {
  const [docs, blog, categories] = await Promise.all([
    queryCollectionNavigation('docs'),
    queryCollectionNavigation('blog'),
    queryCollectionNavigation('categories')
  ])

  return [...docs, ...blog, ...categories]
}, { default: () => [] })

const { data: files } = useLazyAsyncData('search', async () => {
  const [docs, blog, categories] = await Promise.all([
    queryCollectionSearchSections('docs'),
    queryCollectionSearchSections('blog'),
    queryCollectionSearchSections('categories')
  ])

  return [...docs, ...blog, ...categories]
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
