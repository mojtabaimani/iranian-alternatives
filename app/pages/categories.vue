<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const links = computed(() => navigation.value.find(item => item.path === '/categories')?.children ?? [])
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <template #top>
            <UContentSearchButton
              :collapsed="false"
              class="rounded-md"
              size="sm"
            />
          </template>

          <UContentNavigation
            :navigation="links"
            highlight
          />
        </UPageAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>
