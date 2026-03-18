<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()

const slug = computed(() => {
  const parts = route.params.slug
  return Array.isArray(parts) ? parts.join('/') : parts
})

const { data: category } = await useAsyncData(`category-${slug.value}`, () =>
  queryCollection('categories').where('stem', '=', `5.categories/${slug.value}`).first()
)

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

useSeoMeta({
  title: category.value.title || '',
  ogTitle: category.value.title || '',
  description: category.value.description || '',
  ogDescription: category.value.description || ''
})

const { data: allCategories } = await useAsyncData('categories-surround', () =>
  queryCollection('categories').all()
)

function buildLink(cat: { title?: string | null, description?: string | null, stem: string }) {
  return { title: cat.title || '', description: cat.description || '', path: `/categories/${cat.stem?.split('/').pop()}` } as ContentNavigationItem
}

const surround = computed(() => {
  if (!allCategories.value || !category.value) return []
  const sorted = [...allCategories.value].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  const idx = sorted.findIndex(c => c.stem === category.value!.stem)
  const prev = idx > 0 ? sorted[idx - 1] : null
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null
  return [
    prev ? buildLink(prev) : undefined,
    next ? buildLink(next) : undefined
  ].filter(Boolean) as ContentNavigationItem[]
})
</script>

<template>
  <UPage v-if="category">
    <UPageHeader
      :title="category.title || ''"
      :description="category.description || ''"
    >
      <template #icon>
        <UIcon
          v-if="category.icon"
          :name="category.icon"
          class="size-8 text-green-600 dark:text-green-500"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <UPageGrid>
        <UPageCard
          v-for="service in category.services"
          :key="service.name"
          :to="service.website"
          target="_blank"
        >
          <div class="flex-1 min-w-0">
            <div class="flex flex-col items-start gap-1 mb-2">
              <img
                v-if="service.logo"
                :src="service.logo"
                :alt="`${service.name} logo`"
                class="w-40 h-auto object-contain"
              >
              <h3 class="font-semibold truncate text-2xl">
                {{ service.name }}
              </h3>
            </div>

            <p class="text-muted text-sm">
              {{ service.description }}
            </p>

            <div class="flex flex-wrap gap-2 mt-3">
              <UBadge
                v-for="tag in service.tags"
                :key="tag"
                size="xs"
                variant="subtle"
              >
                {{ tag }}
              </UBadge>
            </div>

            <div class="flex items-center gap-2 mt-4 text-sm text-muted">
              <span>Country:</span>
              <div class="flex items-center gap-1">
                <span>{{ service.location }}</span>
                <img
                  v-if="service.flag"
                  :src="service.flag"
                  :alt="service.location"
                  class="w-4 h-4"
                >
              </div>
            </div>

            <div class="flex items-start gap-2 mt-4 text-sm text-muted">
              <span class="shrink-0">Website:</span>
              <div class="flex-1 min-w-0">
                <span class="break-words">{{ service.website }}</span>
              </div>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>

      <USeparator
        v-if="surround?.some(Boolean)"
        class="my-8"
      />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>
