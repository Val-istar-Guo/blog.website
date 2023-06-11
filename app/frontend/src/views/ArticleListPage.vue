<script setup lang="ts">
import { fetchArticles } from '@/api/backend'
import type { ArticleDto } from '@/api/backend/components/schemas'
import { useAsyncState } from '@vueuse/core'

const { state: articles, isReady, isLoading } = useAsyncState(
  async () => {
    const body: ArticleDto[] = await fetchArticles()
    return body
  },
  [],
)

</script>
<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.title">
        <RouterLink :to="`/articles/${article.title}`">
          {{ article.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="postcss">
</style>
