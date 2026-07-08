<script setup lang="ts">
const { data: categories } = await useAsyncData('categories-list', () => queryCollection('categories').order('title', 'ASC').all(), { default: () => [] })

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
      <UPageGrid>
        <UPageCard
          v-for="category in categories"
          :key="category.path"
          :title="category.title"
          :description="category.description"
          :icon="category.icon"
          :to="category.path"
          :ui="{
            leadingIcon: 'size-8 shrink-0 text-green-600 dark:text-green-500'
          }"
        >
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
    </UPageBody>
  </UPage>
</template>
