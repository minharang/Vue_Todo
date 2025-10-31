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

// 라우터 네비게이션 에러 핸들러
router.onError((error) => {
  console.error('Router error:', error)
  // 네비게이션 에러 발생 시 홈으로 이동(또는 사용자 알림)
  router.push('/Home').catch(() => {})
})

export default router