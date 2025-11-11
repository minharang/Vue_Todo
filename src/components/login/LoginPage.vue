<script setup>
import LoginForm from '@/components/login/LoginForm.vue'; 
</script>


<template>
  <div class="login-page-wrapper">
    <main class="login-main-content">
      <LoginForm />
    </main>

    </div>
</template>

<style>
/* 전체 페이지 스타일 (body에 적용될 수도 있습니다) */
.login-page-wrapper {
  min-height: 100vh; /* 뷰포트 높이 전체 */
  background-color: #f0f2f5; /* 이미지상의 회색 배경 */
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 (로그인 폼만 있을 경우) */
  font-family: 'Arial', sans-serif; /* 기본 폰트 설정 */
}

.login-main-content {
  /* 필요에 따라 추가 스타일 */
  flex-grow: 1; /* 헤더/푸터 제외하고 남은 공간 차지 (있을 경우) */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%;
}

/* 전역 CSS 초기화 (선택 사항, Reset CSS나 Normalize.css 사용 권장) */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 패딩, 보더가 너비에 포함되도록 */
}
</style>