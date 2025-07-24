<template>
  <h2 class="text-xl font-semibold mb-4">업무 수행률 정보</h2>
  <div class="flex max-w-4xl mx-auto p-6 rounded-2xl shadow-xl bg-white items-stretch gap-6 justify-between">

    <!-- 왼쪽 도넛차트 영역 -->
     <div name="a" class="flex flex-col items-center justify-start" style="width: 200px; height: 150px;">
      <h3 class="card-title mb-2">업무 공수시간</h3>
      <!-- ✅ 도넛 차트 wrapper -->
      <div class="relative w-full h-[200px]">
        <!-- ✅ 도넛 차트 -->
        <Pie :data="chartData" :options="chartOptions" :plugins="[centerTextPlugin]" />
      </div>
    </div>

  <!-- 텍스트 정보 영역 -->
  <div name="b" class="w-2/3 h-full flex flex-col justify-between text-sm text-gray-700 leading-relaxed" style="margin-top: -160px;">
      <div class="relative flex-1">
        <h3 class="card-title" style="margin-bottom: 5%;">업무 공수시간 요약</h3>

          <li>📊 총 업무시간: <strong>{{ totalHours }}</strong>시간</li>
          <li>🗓️ 휴일/휴가 시간: <strong>{{ holidayHours }}</strong>시간</li>
          <li>⏰ 실제 업무 가능 시간: <strong>{{ totalAvailableHours }}</strong>시간</li>
          <li>💼 실제 근무한 시간: <strong>{{ actualHours }}</strong>시간</li>

      </div>
</div>
</div>
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
      display: true,
    },
    tooltip: {
      displayColors: false, // 여기 추가
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}시간`,
      },
    }, 
    datalabels: {
      display: true,
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
    const fontSize = (height / 100).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#4F46E5';
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};
</script>

<style scoped>
canvas {
  width: 300px !important;
  height: 300px !important;
}
</style>
