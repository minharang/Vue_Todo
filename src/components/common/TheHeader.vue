<script setup>
import { useRouter, useRoute } from 'vue-router';
import TheButton from '@/components/common/TheButton.vue';

const router = useRouter();
const currentRoute = useRoute();

const logoutAndRedirect = () => {
  console.log("로그아웃 처리 중...");
  // localStorage.removeItem('userToken'); 

  router.replace('/');  
};
</script>

<template>
  <header class="the-header" v-if="currentRoute.path !== '/'">
    <div class="header-left">
      <div class="logo">📋TODO</div>
      <nav class="header-nav">
        <RouterLink to="/" class="nav-item">홈</RouterLink>
        <RouterLink to="/SRManager" class="nav-item">SR관리</RouterLink>
        <RouterLink to="/StatisticsManager" class="nav-item">통계관리</RouterLink>
        <RouterLink to="/AccountManager" class="nav-item">사용자관리</RouterLink>
      </nav>
    </div>
    <div class="header-right">
      <!--button class="icon-button"><span class="moon-icon">🌙</span></!--button-->
      <!--button class="logout-button">로그아웃</!--button>
      <RouterLink-- to="/Login" class="nav-item">임시 로그인</RouterLink--> 
      <TheButton type="button" class="logout-button" text="로그아웃" @click="logoutAndRedirect" v-if="currentRoute.path !== '/'"/>
    </div>
  </header>
</template>

<style scoped>
.the-header {
  background-color: #34495e; /* 이미지 상의 어두운 남색 배경 */
  color: #fff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
}

.header-nav {
  display: flex;
  gap: 30px; /* 메뉴 항목 간 간격 */
}

.nav-item {
  color: #c0c0c0; /* 비활성화된 메뉴 색상 */
  text-decoration: none;
  font-size: 16px;
  padding: 5px 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #fff;
}

.nav-item.router-link-active, /* 정확히 일치하는 경우 */
.nav-item.router-link-exact-active { /* 하위 경로도 포함하는 경우 (필요에 따라 둘 중 하나만 사용) */
  color: #fff; /* 활성화된 메뉴 색상 */
  font-weight: bold;
}

.nav-item.router-link-active::after,
.nav-item.router-link-exact-active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px; /* 밑줄 위치 조정 */
  width: 100%;
  height: 3px;
  background-color: #fff; /* 활성화된 메뉴 밑줄 색상 */
  border-radius: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 24px; /* 달 이모지 크기 */
}

.moon-icon {
  color: #fdd835; /* 달 색상 */
}

.logout-button {
  background: none;
  border: 1px solid #c0c0c0;
  color: #c0c0c0;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #c0c0c0;
  color: #34495e;
}

/* 모바일 반응형 (헤더) */
@media (max-width: 768px) {
  .the-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 20px;
  }

  .header-left {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .logo {
    margin-right: 0;
  }

  .header-nav {
    display: none; /* 모바일에서는 상단 내비 숨김 (햄버거 메뉴 등으로 대체) */
  }

  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>