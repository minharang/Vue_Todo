<script setup>

</script>

<template>
  <div class="dashboard-layout">
    <!-- 라우터 적용위한 헤더 App.vue로 이동 -->
    <!-- <TheHeader /> -->
    <div class="dashboard-content-wrapper">
      <!-- <TheSidebar /> -->
      <main class="main-content-area">
        <!-- <WorkEffortCard /> develop 할때 개발-->
        
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  background-color: #f0f2f5; 
  font-family: 'Arial', sans-serif;
}

.dashboard-content-wrapper {
  display: flex;
  flex-grow: 1; 
}

.main-content-area {
  flex-grow: 1; 
  padding: 25px; 
  display: flex;
  flex-direction: column; 
  gap: 25px; /* 카드들 사이의 간격 */
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>