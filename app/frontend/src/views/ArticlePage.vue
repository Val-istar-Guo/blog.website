<script setup lang="ts">
import { fetchArticle } from '@/api/backend'
import MarkdownCatalog from '@/components/MarkdownCatalog.vue'
import MarkdownRender from '@/components/MarkdownRender.vue'
import MarkdownTitle from '@/components/MarkdownTitle.vue'
import { useAsyncState } from '@vueuse/core'
import { useRoute } from 'vue-router'

const route = useRoute()

const { state: article, isReady, isLoading } = useAsyncState(
  async () => {
    const res = await fetchArticle({ title: String(route.params.title) })
      .option('resolveWithFullResponse')

    return await res.text()
  },
  '',
)


</script>

<template>
  <MarkdownCatalog :content="article" />
  <MarkdownTitle :content="article" />
  <MarkdownRender :content="article" />
</template>
