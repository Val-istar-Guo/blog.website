import unified from 'unified'
import markdown from 'remark-parse'
import { selectAll } from 'unist-util-select'
import toString from 'mdast-util-to-string'


const processor = unified()
  .use(markdown)

export function getSummary(md: string): string[] {
  const tree = processor.parse(md)
  return selectAll('heading[depth=2]', tree)
    .map(header => toString(header))
}
