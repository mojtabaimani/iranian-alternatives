<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(withoutTrailingSlash(route.path)).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryCollectionItemSurroundings('docs', withoutTrailingSlash(route.path), {
  fields: ['description']
}), { default: () => [] })

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage('Saas', {
  title: page.value.title,
  description: page.value.description
})

// Title of the section (parent navigation node) containing the current page
const headline = computed(() => {
  const docsNav = navigation.value.find(item => item.path === '/docs')?.children ?? []

  const findParentTitle = (items: ContentNavigationItem[], parentTitle?: string): string | undefined => {
    for (const item of items) {
      if (item.path === page.value?.path) {
        return parentTitle
      }
      if (item.children?.length) {
        const found = findParentTitle(item.children, item.title)
        if (found) {
          return found
        }
      }
    }
    return undefined
  }

  return findParentTitle(docsNav)
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />

      <USeparator v-if="surround?.filter(Boolean).length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page.body?.toc"
      #right
    >
      <UContentToc :links="page.body?.toc?.links" />
    </template>
  </UPage>
</template>
