<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { data: page } = await useAsyncData('index', () => queryCollection('landing').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Link colors/sizes come from YAML as plain strings, wider than Nuxt UI's literal unions
const heroLinks = computed(() => page.value?.hero?.links as ButtonProps[] | undefined)
const featureLinks = computed(() => page.value?.features?.links as ButtonProps[] | undefined)
const ctaLinks = computed(() => page.value?.cta?.links as ButtonProps[] | undefined)

// The category grid is driven directly by the categories collection (single source of
// truth, same as /categories). Empty "coming soon" categories are omitted from the
// homepage but stay reachable from /categories.
const { data: categories } = await useAsyncData('index-categories', () => queryCollection('categories').order('title', 'ASC').all(), { default: () => [] })
const featuredCategories = computed(() => categories.value.filter(category => category.services?.length))
const categoryGroups = computed(() => groupCategories(featuredCategories.value))

// Featured-services logo strip: names come from the landing YAML, logo and
// category link are resolved from the categories collection (single source of
// truth for service data). Names without a match or logo are silently skipped.
const featuredServices = computed(() => {
  const names = page.value?.logos?.services
  if (!names?.length) {
    return []
  }
  const byName = new Map<string, { name: string, logo: string, to: string }>()
  for (const category of categories.value) {
    for (const service of category.services || []) {
      if (service.logo && !byName.has(service.name)) {
        byName.set(service.name, { name: service.name, logo: service.logo, to: category.path })
      }
    }
  }
  return names.map(name => byName.get(name)).filter(service => service !== undefined)
})

// Stats strip under the hero, derived from the categories collection so the
// numbers never go stale as services are added.
const comingSoonCount = computed(() => categories.value.length - featuredCategories.value.length)
const stats = computed(() => [
  {
    value: featuredCategories.value.reduce((sum, category) => sum + (category.services?.length || 0), 0),
    label: 'Iranian services'
  },
  {
    value: featuredCategories.value.length,
    label: 'Categories covered'
  },
  {
    value: comingSoonCount.value,
    label: 'Categories open for contribution'
  }
])

// The CTA title in the YAML uses a {count} placeholder for the number of
// empty categories, filled in here so the copy stays accurate on its own.
const ctaTitle = computed(() => page.value?.cta?.title?.replace('{count}', String(comingSoonCount.value)))

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

      <div class="flex justify-center">
        <UContentSearchButton
          :collapsed="false"
          label="Search for a service or category..."
          size="xl"
          class="w-full max-w-md"
        />
      </div>

      <div class="flex flex-wrap items-start justify-center gap-x-16 gap-y-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center"
        >
          <p class="text-4xl font-bold text-highlighted">
            {{ stat.value }}
          </p>
          <p class="text-sm text-muted mt-1">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </UPageHero>

    <UPageLogos
      v-if="featuredServices.length"
      :title="page.logos?.title"
      :ui="{ logos: 'mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto' }"
    >
      <NuxtLink
        v-for="service in featuredServices"
        :key="service.name"
        :to="service.to"
        :title="service.name"
        :aria-label="service.name"
      >
        <img
          :src="service.logo"
          :alt="service.name"
          class="h-12 w-auto max-w-44 shrink-0 object-contain opacity-90 transition hover:opacity-100 dark:bg-white/90 dark:rounded-md dark:p-1.5"
          loading="lazy"
        >
      </NuxtLink>
    </UPageLogos>

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
      :links="featureLinks"
    >
      <div
        v-for="(group, groupIndex) in categoryGroups"
        :key="group.name"
        :class="groupIndex > 0 ? 'mt-16' : ''"
      >
        <h3 class="mb-6 text-xl font-semibold text-highlighted">
          {{ group.name }}
        </h3>
        <UPageGrid>
          <UPageCard
            v-for="category in group.categories"
            :key="category.path"
            :title="category.title"
            :icon="category.icon"
            :to="category.path"
            :ui="{
              leadingIcon: 'size-8 shrink-0 text-green-600 dark:text-green-500'
            }"
          >
            <template #description>
              <span>{{ category.tagline || category.description }}</span>
              <span
                v-if="category.alternativeTo?.length"
                class="mt-2 block text-xs font-medium text-green-600 dark:text-green-500"
              >
                Alternative to {{ formatAlternatives(category.alternativeTo) }}
              </span>
            </template>
            <template #footer>
              <UBadge
                :label="`${category.services.length} ${category.services.length === 1 ? 'service' : 'services'}`"
                color="neutral"
                variant="subtle"
              />
            </template>
          </UPageCard>
        </UPageGrid>
      </div>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        :title="ctaTitle"
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
