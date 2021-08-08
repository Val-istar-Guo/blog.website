<template>
  <v-app>
    <v-main>
      <v-container
        class="ma-0"
        fluid
      >
        <v-row
          class="min-fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-col
            class="text-center  pb-md-16"
            cols="12"
            lg="6"
            md="8"
            sm="12"
          >
            <v-row>
              <v-col>
                <h1 class="text-h3 text-md-h1 font-weight-thin mb-6">
                  {{ author.name }}
                </h1>

                <h6 class="text-subtitle-1 text-sm-h6 font-weight-thin">
                  欢迎来到我的博客
                </h6>

                <h4
                  v-if="$vuetify.breakpoint.mdAndUp"
                  class="text-caption text-sm-subtitle-1"
                >
                  <span
                    v-for="(desc, index) of author.description"
                    :key="index"
                    class="d-block"
                  >
                    {{ desc }}
                  </span>
                </h4>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" xl="6" lg="10" md="10" sm="8">
                <v-img
                  class="mt-1 mb-16 mt-md-6"
                  src="https://github-readme-stats.vercel.app/api?username=val-istar-guo&show_icons=true&hide_title=true&hide_border=true&theme=graywhite&locale=cn"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-subheader>目录</v-subheader>
        </v-row>
        <v-row class="mb-16" justify="center">
          <v-col cols="12" sm="6">
            <v-list>
              <v-list-item
                v-for="(item, index) in list"
                :key="index"
                :href="item.url"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer padless>
      <v-card class="flex" flat tile>
        <v-card-title>
          <strong class="subheading">2021©</strong>
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import * as base64 from 'js-base64'
import { request } from 'keq'
import unified from 'unified'
import markdown from 'remark-parse'
import { selectAll } from 'unist-util-select'
import * as mdast from 'mdast'
import * as author from '@/config/author'


export default Vue.extend({
  async asyncData({ params, redirect }) {
    const body = await request
      .get('https://api.github.com/repos/Val-istar-Guo/article/contents/summary.md')
      .params('title', params.title)

    if (!('content' in body)) redirect('/404')

    const article = base64.decode(body.content)

    const processor = unified()
      .use(markdown)
    const list = selectAll('listItem', processor.parse(article)) as mdast.List[]


    return {
      list: list
        .map(item => {
          const paragraph = item.children[0]

          const link = paragraph.children[0] as unknown as mdast.Link

          const text = link.children[0] as mdast.Text

          return {
            text: text.value,
            url: link.url.replace(/.md$/, ''),
          }
        }),
    }
  },

  data() {
    return {
      author,
      list: [],
    }
  },
  head() {
    return { title: 'Val.istar.Guo Blog' }
  },
})
</script>

<style>
.min-fill-height {
  min-height: 100vh
}

.min-half-height {
  min-height: 50vh
}
</style>
