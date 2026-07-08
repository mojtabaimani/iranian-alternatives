<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { data: page } = await useAsyncData('index', () => queryCollection('landing').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Link colors/sizes come from YAML as plain strings, wider than Nuxt UI's literal unions
const heroLinks = computed(() => page.value?.hero?.links as ButtonProps[] | undefined)
const ctaLinks = computed(() => page.value?.cta?.links as ButtonProps[] | undefined)

// The category grid is driven directly by the categories collection (single source of
// truth, same as /categories). Empty "coming soon" categories are omitted from the
// homepage but stay reachable from /categories.
const { data: categories } = await useAsyncData('index-categories', () => queryCollection('categories').order('title', 'ASC').all(), { default: () => [] })
const featuredCategories = computed(() => categories.value.filter(category => category.services?.length))

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage('Saas', {
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      id="top"
      :title="page.hero.title"
      :description="page.hero.description"
      :links="heroLinks"
    >
      <template #top>
        <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
      </template>
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :features="section.features"
    />

    <UPageSection
      id="categories"
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="category in featuredCategories"
          :key="category.path"
          :title="category.title"
          :description="category.tagline || category.description"
          :icon="category.icon"
          :to="category.path"
          :ui="{
            leadingIcon: 'size-8 shrink-0 text-green-600 dark:text-green-500'
          }"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        :title="page.cta.title"
        :description="page.cta.description"
        :links="ctaLinks"
        class="bg-gray-100/50 dark:bg-gray-800/50"
      />
    </UPageSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-image:
    linear-gradient(to right, var(--ui-color-neutral-200) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ui-color-neutral-200) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, var(--ui-color-neutral-800) 1px, transparent 1px),
      linear-gradient(to bottom, var(--ui-color-neutral-800) 1px, transparent 1px);
  }
}
</style>
