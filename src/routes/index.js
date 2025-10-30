import { createRouter, createWebHistory, routerKey } from 'vue-router'  /* 설치: npm i vue-router */
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
    },
    // 잘못된 경로가 들어오면 홈으로 리다이렉트
    { path: '/:pathMatch(.*)*', redirect: '/Home' }
  ]
})

export default router