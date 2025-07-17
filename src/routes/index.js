import { createRouter, createWebHistory, routerKey } from 'vue-router'
import HomePage from '@/routes/pages/HomePage.vue'
import SRManagerPage from '@/routes/pages/SRManagerPage.vue'
import StatisticsManagerPage from '@/routes/pages/StatisticsManagerPage.vue'
import AccountManagerPage from '@/routes/pages/AccountManagerPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/SRManagerPage',
      component: SRManagerPage
    },
    {
      path: '/StatisticsManagerPage',
      component: StatisticsManagerPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/AccountManagerPage',
      component: AccountManagerPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router