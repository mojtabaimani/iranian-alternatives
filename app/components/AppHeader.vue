<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Home',
  to: '/#top'
}, {
  label: 'Categories',
  to: '/#categories'
}, {
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs')
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
      >
        <img
          src="/logo/iran.svg"
          alt="Iran flag"
          class="h-6 w-auto shrink-0"
        >
        <span class="font-semibold text-sm">Iranian Alternatives</span>
        <UBadge
          label="IR"
          variant="subtle"
          class="mb-0.5"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

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
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
