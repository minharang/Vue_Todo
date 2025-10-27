<script setup>
import WorkloadProgressChart from '@/components/todo/WorkloadProgressChart.vue';
</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-content-wrapper">
      <main class="main-content-area">
        <div class="card user-management-card">
            <div class="card-header-with-button">
                <h3 class="card-title">통계 관리</h3>
           </div>

            TBD
            <WorkloadProgressChart/>
        </div>
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
.user-management-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1.5rem;
}
.card-header-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>