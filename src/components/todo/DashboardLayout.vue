<script setup>
import TheHeader from '../common/TheHeader.vue';
import TheSidebar from '../common/TheSidebar.vue';
import WorkEffortCard from '../common/WorkEffortCard.vue';
import TodoListCard from '../common/TodoListCard.vue';
</script>

<template>
  <div class="dashboard-layout">
    <TheHeader />
    <div class="dashboard-content-wrapper">
      <TheSidebar />
      <main class="main-content-area">
        <WorkEffortCard />
        <TodoListCard />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column; /* 헤더가 위, 그 아래 사이드바+메인콘텐츠 */
  min-height: 100vh; /* 최소 화면 높이 */
  background-color: #f0f2f5; /* 전체적인 배경색 */
  font-family: 'Arial', sans-serif;
}

.dashboard-content-wrapper {
  display: flex; /* 사이드바와 메인 콘텐츠를 가로로 나열 */
  flex-grow: 1; /* 남은 공간을 모두 차지하여 푸터가 있다면 아래로 밀기 */
}

.main-content-area {
  flex-grow: 1; /* 사이드바를 제외한 나머지 공간 차지 */
  padding: 25px; /* 콘텐츠 영역의 내부 여백 */
  display: flex;
  flex-direction: column; /* 카드들을 세로로 쌓기 */
  gap: 25px; /* 카드들 사이의 간격 */
}

/* 전역 CSS (선택 사항, Reset CSS나 Normalize.css 사용 권장) */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>