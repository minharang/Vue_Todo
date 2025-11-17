<script setup>
import { ref, computed , onMounted } from 'vue'
import { Pencil, X } from 'lucide-vue-next'  /* TODO. npm i lucide-vue-next 설치 confluence에 적을것!!! 잊지말고... */
//import { useStatisticsStore } from '@/stores/statistics';
import { useToast } from '@/stores/toast';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000'; 

//const statisticsStore = useStatisticsStore();

// 상태 변수
const { addToast } = useToast();
const statisticsList = ref([]);
const loading = ref(true);
const error = ref(null);



const fetchStatisticsMng = async () => {
    loading.value = true;
    error.value = null;
    try {
        // 실제 할 일 데이터를 가져오는 API 엔드포인트 호출
        const response = await axios.get(`${API_BASE_URL}/api/statistics`);
        
        // **중요**: DB에서 가져온 배열을 `statisticsList.value`에 저장합니다.
        statisticsList.value = response.data; 
        console.log("statisticsList.value :: " + statisticsList.value);
        addToast('게시물이 조회되었습니다!', 'success', 3000);
        
    } catch (err) {
        addToast('통계 데이터를 불러오는데 실패하였습니다.', 'error', 3000);
        console.error('통계 데이터를 불러오는데 실패하였습니다.', err);
        error.value = '통계 데이터를 불러오는데 실패하였습니다.';
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchStatisticsMng(); 
});

</script>
<template>
<div class="user-table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>사용자</th>
          <th>년도</th>
          <th>월</th>
          <th>일</th>
          <th>서비스 유형</th>
          <th>계산된 공수시간 합계</th>
          <th>보고된 공수시간 합계</th>
          <th>생성일</th>
          <th>수정일</th>
        </tr>
      </thead>

      <tbody>
       <tr v-if="loading">
          <td colspan="5" class="text-center">데이터를 불러오는 중입니다...</td>
       </tr>
          
       <tr v-else-if="error">
          <td colspan="5" class="text-center error-message">
              {{ error }}
          </td>
       </tr>
        <tr v-for="data in statisticsList" :key="data.user_id">
          <td>{{ data.user_name }}</td>
          <td>{{ data.year }}</td>
          <td>{{ data.month }}</td>
          <td>{{ data.date }}</td>
          <td>{{ data.cd_nm }}</td>
          <td>{{ data.calculate_hour_sum }}</td>
          <td>{{ data.man_hour_sum }}</td>
          <td>{{ data.created_dt }}</td>
          <td>{{ data.updated_dt }}</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.user-table-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.user-table th,
.user-table td {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: center; /* ✅ 모든 컬럼 가운데 정렬 */
  vertical-align: middle;
}

.user-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.status-dot.active {
  background: #22c55e;
}
.status-dot.inactive {
  background: #9ca3af;
}

/* ✅ 아이콘 버튼 영역 */
.action-icons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.icon-button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.icon-button:hover {
  background: #f3f4f6;
}

.icon-button.edit svg {
  stroke: #3b82f6; /* 파란색 (수정) */
}

.icon-button.delete svg {
  stroke: #ef4444; /* 빨간색 (삭제) */
}
</style>