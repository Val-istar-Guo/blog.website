<script setup lang="ts">
import type { Heading } from '@/types/heading'
import GithubSlugger from 'github-slugger'
import type { Heading as MdastHeading } from 'mdast'
import { toString } from 'mdast-util-to-string'
import * as R from 'ramda'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { selectAll } from 'unist-util-select'
import { computed, defineProps } from 'vue'
import CatalogTree from './CatalogTree.vue'

const props = defineProps<{
  content: string
}>()

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)


const headings = computed(() => {
  const tree = processor.parse(props.content)
  let headingNodes = selectAll('heading[depth]', tree) as MdastHeading[]

  headingNodes = headingNodes.filter((header) => header.depth > 1 && header.depth < 6)
  const slugger = new GithubSlugger()

  const root: Heading = {
    text: '',
    depth: 0,
    slug: '',
    children: [],
  }
  const stack = [root]

  for (const headingNode of headingNodes) {
    const text = toString(headingNode)

    const item: Heading = {
      text,
      depth: headingNode.depth,
      slug: slugger.slug(text),
      children: [],
    }

    const last = R.last(stack) as Heading

    if (item.depth < last.depth) {
      let parent = last
      do {
        stack.pop()
        parent = R.last(stack) as Heading
      } while (item.depth <= parent.depth)

      parent.children.push(item)
      stack.push(item)
    } else if (item.depth === last.depth) {
      stack.pop()
      R.last(stack)?.children.push(item)
      stack.push(item)
    } else if (item.depth > last.depth) {
      last.children.push(item)
      stack.push(item)
    }
  }

  return root.children
})

</script>
<template>
  <div class="catalog">
    <div class="catalog-title">目录</div>
    <CatalogTree :headings="headings" />
  </div>
</template>
<style scoped lang="postcss">
</style>
