<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => queryCollection('about').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

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
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHeader
        :title="page.title"
        :description="page.description"
      />

      <UPageBody>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
      </UPageBody>

      <template
        v-if="page.body?.toc"
        #right
      >
        <UContentToc :links="page.body?.toc?.links" />
      </template>
    </UPage>
  </UContainer>
</template>
