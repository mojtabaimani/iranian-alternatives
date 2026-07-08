<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const links = [
  {
    label: 'Home',
    to: '/#top'
  },
  {
    label: 'Categories',
    to: '/#categories'
  },
  {
    label: 'Docs',
    to: '/docs'
  },
  {
    label: 'Blog',
    to: '/blog'
  }
]
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center gap-2">
        <UColorModeImage
          light="/logo/iran.svg"
          dark="/logo/iran.svg"
          alt="iran flag"
          class="h-6 w-auto shrink-0"
        />
        Iranian Alternatives <UBadge
          label="IR"
          variant="subtle"
          class="mb-0.5"
        />
      </div>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <UColorModeButton size="sm" />

      <UButton
        to="https://github.com/mojtabaimani/iranian-alternatives"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>

    <template #body>
      <UContentNavigation
        :navigation="navigation"
        default-open
        highlight
      />
    </template>
  </UHeader>
</template>
