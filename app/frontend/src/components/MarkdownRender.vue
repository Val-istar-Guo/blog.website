<template>
  <article class="article" v-html="html" />
</template>
<script setup lang="ts">

import { remarkRemove } from '@/utils/remark-remove'
import { remarkReplaceImageUrl } from '@/utils/remark-replace-image-url'
import { computedAsync } from '@vueuse/core'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFootnotes from 'remark-footnotes'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkGithub from 'remark-github'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { unified } from 'unified'


import 'prismjs/themes/prism.min.css'
// prism.min.css 需要在github theme之前以避免行号错误
import '@jongwooo/prism-theme-github/themes/prism-github-default-auto.min.css'
// import '@jongwooo/prism-theme-github/themes/prism-github-default-dark.css'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-docker.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const props = defineProps<{
  content: string
}>()

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkFootnotes)
  .use(remarkRemove, { where: (node: any) => (node.type === 'heading' && node.depth === 1) || (node.type === 'yaml') })
  .use(remarkReplaceImageUrl, {
    replace: (url: string): string => {
      const nodeURL = (url).replace(/^\.\//, '')
      return `/api/articles/files/${nodeURL}`
    },
  })
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkGithub, { repository: 'val-istar-guo/article' })
  .use(remark2rehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeKatex)
  .use(rehypePrism, { plugins: ['line-numbers'] })
  .use(rehypeStringify)

const html = computedAsync(
  async () => {
    const html: string = await processor.process(props.content) as unknown as string
    return html
  },
  '',
)
</script>

<style lang="postcss">
</style>
