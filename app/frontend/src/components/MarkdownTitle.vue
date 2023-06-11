<script setup lang="ts">
import { toString } from 'mdast-util-to-string'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { select } from 'unist-util-select'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  content: string
}>()

const processor = unified()
  .use(remarkParse)

const title = computed(() => {
  const tree = processor.parse(props.content)
  const h1 = select('heading[depth=1]', tree)

  if (!h1) return ''
  const title: string = toString(h1)
  return title
})

</script>
<template>
  <h1 class="title">{{ title }}</h1>
</template>
<style scoped lang="postcss">
.title {
  font-size: 2rem;
}
</style>

