import ArticleListPage from '@/views/ArticleListPage.vue'
import ArticlePage from '@/views/ArticlePage.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ArticleListPage,
    },
    {
      path: '/articles/:title',
      name: 'article',
      component: ArticlePage,
    },
  ],
})

export default router
