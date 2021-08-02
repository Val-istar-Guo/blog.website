<template>
  <v-app>
    <v-navigation-drawer app>
      <template #prepend>
        <v-list-item
          href="https://github.com/Val-istar-Guo"
          two-line
        >
          <v-list-item-avatar>
            <v-img :src="author.avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Val.istar.Guo</v-list-item-title>
            <v-list-item-subtitle>SHEIN</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list dense nav>
        <v-list-item
          v-for="header in summary"
          :key="header"
          :href="`#${slug(header)}`"
          link
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ header }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      elevate-on-scroll
      color="white"
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon href="https://github.com/Val-istar-Guo/article">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/Val-istar-Guo/article/issues/new" target="_blank">
        <v-icon>mdi-bug</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="pb-0" fluid>
        <v-sheet
          class="pb-6 pl-6 pr-6"
          min-height="70vh"
          rounded="lg"
        >
          <markdown :content="article" />
        </v-sheet>
        <v-footer padless>
          <v-card class="flex" flat tile>
            <v-card-title>
              <strong class="subheading">2021©</strong>
            </v-card-title>
          </v-card>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import * as base64 from 'js-base64'
import { request } from 'keq'
import { getTitle } from '@/utils/get-title'
import { getSummary } from '@/utils/get-summary'
import Slugger from 'github-slugger'
import * as author from '@/config/author'


export default Vue.extend({
  async asyncData({ params, redirect }) {
    const body = await request
      .get('https://api.github.com/repos/Val-istar-Guo/article/contents/articles/:title.md')
      .params('title', params.title)

    if (!('content' in body)) {
      redirect('/404')
      return
    }

    const article = base64.decode(body.content)
    const title = getTitle(article)
    const summary = getSummary(article)

    return { article, title, summary }
  },

  data() {
    return {
      title: '',
      article: '',
      summary: null,
      author,
    }
  },

  head() {
    const title = this.title as string
    return { title }
  },

  methods: {
    slug(str: string): string {
      return Slugger.slug(str)
    },

  },
})
</script>
