<script setup lang="ts">
const { data: categories } = await useAsyncData('categories-list', () => queryCollection('categories').order('title', 'ASC').all(), { default: () => [] })
const categoryGroups = computed(() => groupCategories(categories.value))

const title = 'Categories'
const description = 'Browse all categories of Iranian alternative services.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Saas', { title, description })
</script>

<template>
  <UPage>
    <UPageHeader
      :title="title"
      :description="description"
    />

    <UPageBody>
      <div
        v-for="(group, groupIndex) in categoryGroups"
        :key="group.name"
        :class="groupIndex > 0 ? 'mt-16' : ''"
      >
        <h2 class="mb-6 text-xl font-semibold text-highlighted">
          {{ group.name }}
        </h2>
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
              <span>{{ category.description }}</span>
              <span
                v-if="category.alternativeTo?.length"
                class="mt-2 block text-xs font-medium text-green-600 dark:text-green-500"
              >
                Alternative to {{ formatAlternatives(category.alternativeTo) }}
              </span>
            </template>
            <template
              v-if="!category.services?.length"
              #footer
            >
              <UBadge
                color="neutral"
                variant="subtle"
                size="sm"
                label="Coming soon"
              />
            </template>
          </UPageCard>
        </UPageGrid>
      </div>
    </UPageBody>
  </UPage>
</template>
