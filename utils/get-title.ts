import unified from 'unified'
import markdown from 'remark-parse'
import { select } from 'unist-util-select'
import toString from 'mdast-util-to-string'


const processor = unified()
  .use(markdown)

export function getTitle(md: string): string {
  const tree = processor.parse(md)
  const h1 = select('heading[depth=1]', tree)

  if (h1) return toString(h1)
  return ''
}

