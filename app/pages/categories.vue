<script setup lang="ts">
const { data: categories } = await useAsyncData('categories-list', () => queryCollection('categories').all())

const navItems = computed(() => (categories.value || []).map(cat => ({
  label: cat.title || cat.stem?.split('/').pop() || '',
  to: `/categories/${cat.stem?.split('/').pop()}`
})).sort((a, b) => a.label.localeCompare(b.label)))
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <template #top>
            <UContentSearchButton :collapsed="false" />
          </template>

          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
          />
        </UPageAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>
