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
      <div class="relative flex-1">
        <h3 class="card-title summary-title">업무 공수시간 요약</h3>

        <ul class="summary-list"> 
          <li>📊 총 업무시간: <strong>{{ totalHours }}</strong>시간</li>
          <li>🗓️ 휴일/휴가 시간: <strong>{{ holidayHours }}</strong>시간</li>
          <li>⏰ 실제 업무 가능 시간: <strong>{{ totalAvailableHours }}</strong>시간</li>
          <li>💼 실제 근무한 시간: <strong>{{ actualHours }}</strong>시간</li>
        </ul>

      </div>
    </div>
  </div>
  <!-- 에러 발생 버튼 추가 -->
  <!--
  <button @click="causeError" style="margin-top:20px;padding:10px 20px;font-weight:bold;color:#fff;background:#ef4444;border-radius:6px;border:none;cursor:pointer;">
    에러 발생 테스트
  </button>
  -->
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels) 

// ✅ 데이터 설정
const totalHours = 500
const holidayHours = 200
const actualHours = 200

const totalAvailableHours = totalHours - holidayHours
const remainingHours = Math.max(totalAvailableHours - actualHours, 0)
const percentage = Math.round((actualHours / totalAvailableHours) * 100)

const chartData = {
  labels: ['업무 수행', '미진행'],
  datasets: [
    {
      data: [actualHours, remainingHours],
      backgroundColor: ['#4F46E5', '#E5E7EB'],
      borderWidth: 0,
    },
  ],
}

const chartOptions = {
  responsive: false, 
  maintainAspectRatio: false, 
  cutout: '60%',
  plugins: {
    legend: {
      display: false, 
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}시간`,
      },
    }, 
    datalabels: {
      display: false, 
      color: 'black',
      font: {
        weight: 'bold',
        size: 18,
      },
      formatter: (value) => `${value}`,
    },
  },
}

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const text = `${percentage}%`;

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

// 에러 핸들러 테스트용 버튼 함수
function causeError() {
  throw new Error("테스트용 고의 에러 발생!");
}
</script>

<style scoped>
/* 섹션 타이틀 스타일 */
.section-title {
  font-size: 1.5rem; 
  font-weight: 600; 
  color: #333;
  margin-bottom: 1rem; 
  text-align: center; 
}

.performance-info-card {
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 160px;
  width: 100%; 
  max-width: none; 
  padding: 40px; 
  min-height: 350px; 
  margin: 0 auto; 
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box; 
}

.chart-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0; 
}

.card-title {
  font-size: 1.2em; 
  font-weight: 600;
  color: #333;
  margin-bottom: 20px; 
  white-space: nowrap; 
}

.donut-chart-wrapper {
  position: relative;
  width: 280px; 
  height: 280px; 
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
  flex-shrink: 1; 
  max-width: 450px; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  text-align: left; 
}

.summary-title {
  margin-bottom: 20px; 
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

/* 반응형 */
@media (max-width: 1200px) { 
    .performance-info-card {
        gap: 120px;
        padding: 35px;
        min-height: 320px;
    }
    .donut-chart-wrapper {
        width: 250px;
        height: 250px;
    }
    .summary-section {
        max-width: 400px; 
    }
    .summary-list {
        font-size: 16px;
        line-height: 2;
    }
    .card-title {
        font-size: 1.15em;
        margin-bottom: 18px;
    }
}

@media (max-width: 992px) { 
  .performance-info-card {
    gap: 80px; 
    padding: 30px;
    min-height: 300px;
  }
  .donut-chart-wrapper {
    width: 220px; 
    height: 220px; 
  }
  .summary-section {
      max-width: 350px; 
  }
  .summary-list {
    font-size: 15px;
    line-height: 1.8;
  }
  .card-title {
      font-size: 1.1em;
      margin-bottom: 15px;
  }
}

@media (max-width: 768px) { 
  .section-title {
      font-size: 1.3rem; 
  }

  .performance-info-card {
    flex-direction: column; 
    gap: 30px; 
    padding: 25px; 
    margin: 0 15px; 
    min-height: unset; 
  }

  .chart-section {
    width: 100%;
    align-items: center;
  }

  .donut-chart-wrapper {
    width: 200px; 
    height: 200px;
  }

  .summary-section {
    width: 100%; 
    max-width: none; 
    text-align: left; 
  }

  .summary-list {
    font-size: 14px;
    line-height: 1.7;
  }
  .card-title {
      font-size: 1.0em;
      margin-bottom: 10px;
  }
}

@media (max-width: 480px) { 
    .section-title {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
    }
    .performance-info-card {
        padding: 15px;
        gap: 20px;
        margin: 0 10px; 
    }
    .donut-chart-wrapper {
        width: 160px; 
        height: 160px;
    }
    .summary-list {
        font-size: 13px;
        line-height: 1.6;
    }
}
</style>