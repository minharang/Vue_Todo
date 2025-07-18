
<script setup>
import { ref, computed } from 'vue';

const percentage = ref(50); // 실제 데이터로 교체될 값

const pieChartStyle = computed(() => {
  const angle = percentage.value * 3.6; // 100% = 360도
  return {
    background: `conic-gradient(#007bff ${angle}deg, #e0e0e0 ${angle}deg)`
  };
});
</script>

<template>
  <div class="card work-effort-card">
    <h3 class="card-title">업무 공수시간</h3>
    <div class="card-content">
      <div class="effort-text">
        <p class="placeholder-line short"></p>
        <p class="placeholder-line long"></p>
      </div>
      <div class="chart-container">
        <div class="pie-chart" :style="pieChartStyle">
          <span class="chart-percentage">50%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 25px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.work-effort-card .card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.effort-text {
  flex-grow: 1;
}

.placeholder-line {
  background-color: #f0f0f0;
  height: 15px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.placeholder-line.short {
  width: 60%;
}

.placeholder-line.long {
  width: 85%;
}

.chart-container {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pie-chart {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #007bff;
  /* conic-gradient는 JS에서 computed 속성으로 제어 */
}

.chart-percentage {
  position: absolute;
  background-color: #fff; /* 중앙 텍스트 배경 */
  width: 80px; /* 원 안의 텍스트 공간 */
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
}
</style>