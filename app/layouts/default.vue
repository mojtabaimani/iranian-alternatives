<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', async () => {
  const [categories, about] = await Promise.all([
    queryCollectionNavigation('categories'),
    queryCollectionNavigation('about')
  ])

  return [...categories, ...about]
}, { default: () => [] })

// Search sections for categories are built by hand: YAML pages have no
// markdown body for queryCollectionSearchSections to extract, and this way
// service names and "alternative to" products are searchable too.
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
