<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useLoginStore } from '@/stores/login';
import { useStatisticsStore } from '@/stores/statistics';
import { ref, computed , onMounted, watchEffect } from 'vue'

const loginStore = useLoginStore();
const userId = loginStore.userId;
const statisticsStore = useStatisticsStore();

const loading = ref(true);
const error = ref(null);

const totalHours = ref(0);
const holidayHours = ref(0);
const actualHours = ref(0);

const year = 2025
const month = 11

const fetchWorkloadProgress = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await statisticsStore.getUserActualWorkingHours(userId, year, month);
        actualHours.value = response?.man_hour_sum ?? 0;
        totalHours.value = response?.net_work_hours ?? 0;
        holidayHours.value = response?.holiday_hour_sum ?? 0;
    } catch (err) {
        console.error('그래프 데이터를 불러오는데 실패하였습니다.', err);
        error.value = '그래프 데이터를 불러오는데 실패하였습니다.';
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchWorkloadProgress(); 
});

const safeNumber = (value) => {
  const num = Number(value);
  return isNaN(num) || value === null || value === undefined || value === '' ? 0 : num;
};

const safeActualHours = computed(() => safeNumber(actualHours.value));
const safeTotalHours = computed(() => safeNumber(totalHours.value));
const safeHolidayHours = computed(() => safeNumber(holidayHours.value));

const totalAvailableHours = computed(() => Math.max(safeTotalHours.value - safeHolidayHours.value, 0));
const remainingHours = computed(() => Math.max(totalAvailableHours.value - safeActualHours.value, 0));
const percentage = computed(() => {
  return totalAvailableHours.value > 0
    ? Math.round((safeActualHours.value / totalAvailableHours.value) * 100)
    : 0;
});

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels) 

const chartData = computed(() => ({
  labels: ['진행', '남은 시간'],
  datasets: [{
    data: [safeActualHours.value, remainingHours.value],
    backgroundColor: ['#4F46E5', '#E0E7FF'],
  }],
}));

const chartOptions = {
  responsive: true, 
  maintainAspectRatio: false, 
  cutout: '60%',
  plugins: {
    legend: { display: false },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}시간`,
      },
    }, 
    datalabels: {
      display: false, 
      color: 'black',
      font: { weight: 'bold', size: 18 },
      formatter: (value) => `${value}`,
    },
  },
};

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height, ctx, config } = chart;
    const text = `${percentage.value}%`;

    ctx.restore();
    const fontSize = (height / 100 * 0.4).toFixed(2); 
    ctx.font = `bold ${fontSize}em sans-serif`; 
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#4F46E5'; 
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};
</script>

<template>
  <h2 class="section-title">업무 수행률 정보</h2> 
  <div class="performance-info-card"> 
    <div class="chart-section">
      <h3 class="card-title mb-2">업무 공수시간</h3>
      <div class="donut-chart-wrapper">
        <Pie :data="chartData" :options="chartOptions" :plugins="[centerTextPlugin]" />
      </div>
    </div>

    <div class="summary-section">
      <h3 class="data-v-e9edccf6">업무 공수시간 요약</h3>
      <ul class="summary-list"> 
        <li>📊 총 업무시간: <strong>{{ totalHours }}</strong>시간</li>
        <li>🗓️ 휴일/휴가 시간: <strong>{{ holidayHours }}</strong>시간</li>
        <li>⏰ 실제 업무 가능 시간: <strong>{{ totalAvailableHours }}</strong>시간</li>
        <li>💼 실제 근무한 시간: <strong>{{ actualHours }}</strong>시간</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1.5rem; 
  font-weight: 600; 
  color: #333;
  margin-bottom: 1rem; 
  text-align: center; 
}

.performance-info-card {
  display: flex; 
  align-items: flex-start; 
  justify-content: space-between; 
  flex-wrap: wrap;
  gap: 60px;
  padding: 40px; 
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  width: 100%;
}

.chart-section {
  flex-shrink: 0; 
}

.card-title {
  font-size: 1.2em; 
  font-weight: 600;
  color: #333;
  margin-bottom: 20px; 
  white-space: nowrap; 
  text-align: center;
}

.donut-chart-wrapper {
  position: relative;
  width: 240px; 
  height: 240px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.donut-chart-wrapper canvas {
    width: 100% !important;
    height: 100% !important;
}

.summary-section {
  flex-grow: 1; 
  max-width: 500px; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  text-align: left;
  margin: 0 auto;
}

.summary-title {
  margin-bottom: 20px; 
  text-align: center;
}

.summary-list {
  list-style: none; 
  padding: 0;
  margin: 0;
  font-size: 17px; 
  color: #555;
  line-height: 2.2; 
}

.summary-list li strong {
  color: #333;
  font-weight: 700;
  margin-left: 5px; 
}

@media (max-width: 992px) {
  .performance-info-card {
    flex-direction: column;
    align-items: center;
  }
  .summary-section {
    text-align: center;
  }
}
</style>