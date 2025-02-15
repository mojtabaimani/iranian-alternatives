<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

// Fetch category data from YAML file
const { data: category } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

// Set SEO metadata
useSeoMeta({
  title: category.value.title,
  ogTitle: category.value.title,
  description: category.value.description,
  ogDescription: category.value.description
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/categories')
  .where({ _extension: 'yml', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path)), { default: () => [] })

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer v-if="category">
    <UPageHeader
      :title="category.title"
      :description="category.description"
      :links="category.links"
    >
      <template #icon>
        <UIcon
          v-if="category.icon"
          :name="category.icon"
          class="w-8 h-8"
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
            <!-- Service Header -->
            <div class="flex flex-col items-start gap-1 mb-2">
              <img
                v-if="service.logo"
                :src="service.logo"
                :alt="`${service.name} logo`"
                class="w-48 h-auto object-contain"
              >
              <h3 class="font-semibold truncate text-2xl">{{ service.name }}</h3>
            </div>

            <!-- Service Description -->
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              {{ service.description }}
            </p>

            <!-- Service Tags -->
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

            <!-- Country Information -->
            <div class="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
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
            <!-- Visit Website -->
            <div class="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Website:</span>
              <div class="flex items-center gap-1">
                <span>{{ service.website }}</span>
              </div>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UContainer>
</template>
