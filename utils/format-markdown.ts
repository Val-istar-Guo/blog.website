import unified from 'unified'
import vfile from 'vfile'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import rehypePrism from 'rehype-prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGithub from 'remark-github'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import remarkGfm from 'remark-gfm'
import { removeH1, fixImageLink } from './unified-plugins'


const processor = unified()
  .use(markdown)
  .use(removeH1)
  .use(remarkGfm)
  .use(remarkSlug)
  .use(remarkAutolinkHeadings, {
    content: {
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['oction', 'octicon-link'],
      },
      children: [],
    },
    linkProperties: {
      className: ['anchor'],
      ariaHidden: 'true',
      tabIndex: -1,
    },
  })
  .use(remarkGithub, { repository: 'val-istar-guo/article' })
  .use(remarkMath)
  .use(fixImageLink)
  .use(remark2rehype)
  .use(rehypeKatex)
  .use(rehypePrism, { plugins: ['line-numbers'] })
  .use(html)

export function formatMarkdown(md: string): vfile.VFile {
  return processor.processSync(md)
}
