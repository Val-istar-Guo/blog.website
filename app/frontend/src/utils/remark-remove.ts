import { Plugin } from 'unified'
import { Node } from 'unist'
import { remove } from 'unist-util-remove'


interface RemarkRemoveOptions {
  where: (node: Node) => boolean
}

export const remarkRemove: Plugin = (options: RemarkRemoveOptions) => (tree) => {
  remove(tree, options.where)
}
