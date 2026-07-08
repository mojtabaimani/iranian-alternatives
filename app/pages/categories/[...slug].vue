<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

// Fetch category data from YAML file
const { data: category } = await useAsyncData(route.path, () => queryCollection('categories').path(withoutTrailingSlash(route.path)).first())
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

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryCollectionItemSurroundings('categories', withoutTrailingSlash(route.path), {
  fields: ['description']
}), { default: () => [] })

// GitHub edit link for this category's YAML file, used by the empty-state CTA
const slug = computed(() => withoutTrailingSlash(route.path).split('/').pop())
const editUrl = computed(() => `https://github.com/mojtabaimani/iranian-alternatives/edit/main/content/5.categories/${slug.value}.yml`)

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
</script>

<template>
  <UPage v-if="category">
    <UPageHeader
      :title="category.title"
      :description="category.description"
    >
      <template #headline>
        <UIcon
          v-if="category.icon"
          :name="category.icon"
          class="size-8 text-green-600 dark:text-green-500"
        />
      </template>
    </UPageHeader>

    <UPageBody>
      <UPageGrid v-if="category.services?.length">
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
                class="w-40 h-auto object-contain dark:bg-white/90 dark:rounded-md dark:p-2"
              >
              <h3 class="font-semibold text-2xl">
                {{ service.name }}
              </h3>
            </div>

            <!-- Service Description -->
            <p class="text-muted text-sm">
              {{ service.description }}
            </p>

            <!-- Service Tags -->
            <div class="flex flex-wrap gap-2 mt-3">
              <UBadge
                v-for="tag in service.tags"
                :key="tag"
                size="sm"
                variant="subtle"
              >
                {{ tag }}
              </UBadge>
            </div>

            <!-- Country Information -->
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
            <!-- Visit Website -->
            <div
              v-if="service.website"
              class="flex items-center gap-2 mt-4 text-sm text-muted"
            >
              <span>Website:</span>
              <span>{{ hostname(service.website) }}</span>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>

      <div
        v-else
        class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-default py-16 text-center"
      >
        <UIcon
          name="i-lucide-hourglass"
          class="size-8 text-muted"
        />
        <div>
          <p class="font-medium">
            No services listed here yet.
          </p>
          <p class="text-muted text-sm mt-1">
            Know an Iranian alternative for {{ category.title }}? Help grow the directory.
          </p>
        </div>
        <UButton
          :to="editUrl"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="subtle"
          label="Contribute a service"
        />
      </div>

      <USeparator v-if="surround?.filter(Boolean).length" />

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>
