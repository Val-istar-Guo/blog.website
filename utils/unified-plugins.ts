import path from 'path'
import unist from 'unist'
import unified from 'unified'
import * as R from 'ramda'

import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'


export const fixImageLink: unified.Plugin = () => tree => {
  const selector = (node: unist.Node): boolean => R.propEq('type', 'image', node) && R.path(['url', 0], node) === '.'
  const visitor = (node: any): void => {
    const nodeURL = R.path(['url'], node) as string

    node.url = `https://${path.join('raw.githubusercontent.com/Val-istar-Guo/article/master', '/articles', nodeURL)}?sanitize=true`
  }

  visit(tree, selector, visitor)
}

export const removeH1: unified.Plugin = () => tree => {
  remove(tree, (node: any) => node.type === 'heading' && node.depth === 1)
}
