<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

const title = page.value?.title
const description = page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      id="top"
      :title="page.hero?.title"
      :description="page.hero?.description"
      :links="(page.hero?.links as any)"
    >
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
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
      :title="page.features?.title"
      :description="page.features?.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features?.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        v-bind="(page.cta as any)"
        variant="subtle"
      />
    </UPageSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
