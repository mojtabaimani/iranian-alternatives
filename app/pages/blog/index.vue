<script setup lang="ts">
const { data: page } = await useAsyncData('blog', () => queryCollection('blogLanding').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: posts } = await useAsyncData('posts', () => queryCollection('blog').order('date', 'DESC').all(), { default: () => [] })

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
    <UPageHeader
      :title="page.title"
      :description="page.description"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogPosts v-if="posts.length">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2'
          }"
        />
      </UBlogPosts>

      <div
        v-else
        class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-default py-16 text-center"
      >
        <UIcon
          name="i-lucide-newspaper"
          class="size-8 text-muted"
        />
        <p class="text-muted">
          No posts yet. Check back soon.
        </p>
      </div>
    </UPageBody>
  </UContainer>
</template>
