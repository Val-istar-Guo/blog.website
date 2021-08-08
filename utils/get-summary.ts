import unified from 'unified'
import markdown from 'remark-parse'
import { selectAll } from 'unist-util-select'
import mdast from 'mdast'
import toString from 'mdast-util-to-string'
import * as R from 'ramda'
import Slugger from 'github-slugger'


const processor = unified()
  .use(markdown)


interface Summary {
  title: string
  depth: 2 | 3
  slugger: string
  children: Summary[]
}

export function getSummary(md: string): Summary[] {
  const tree = processor.parse(md)
  let headers = selectAll('heading[depth]', tree) as mdast.Heading[]

  headers = headers
    .filter(header => header.depth === 2 || header.depth === 3)


  const summary: Summary[] = []

  for (const header of headers) {
    const title = toString(header)
    const item: Summary = {
      title,
      depth: header.depth as 2 | 3,
      slugger: Slugger.slug(title),
      children: [],
    }

    if (header.depth === 2) {
      summary.push(item)
    } else {
      const children = R.last(summary)?.children || summary

      children.push(item)
    }
  }

  return summary
}
