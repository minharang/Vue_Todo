import { createRouter, createWebHistory, routerKey } from 'vue-router'
import HomePage from '@/routes/pages/HomePage.vue'
import SRManagerPage from '@/routes/pages/SRManagerPage.vue'
import StatisticsManagerPage from '@/routes/pages/StatisticsManagerPage.vue'
import AccountManagerPage from '@/routes/pages/AccountManagerPage.vue'
import LoginRouterPage from '@/routes/pages/LoginRouterPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/Home',
      component: HomePage
    },
    {
      path: '/',
      component: LoginRouterPage
    },
    {
      path: '/SRManager',
      component: SRManagerPage
    },
    {
      path: '/StatisticsManager',
      component: StatisticsManagerPage
    },
    {
      path: '/AccountManager',
      component: AccountManagerPage
    }
  ]
})

export default router