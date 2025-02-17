<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

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
  <UHeader :links="links">
    <template #logo>
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
    <!-- <template #center>
      <UContentSearchButton />
    </template> -->
    <template #right>
      <UColorModeButton size="sm" />

      <UButton
        to="https://github.com/mojtabaimani/iranian-alternatives"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
