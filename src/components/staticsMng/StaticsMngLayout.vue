<script setup>
import { ref } from 'vue'
import WorkloadProgressChart from '@/components/todo/WorkloadProgressChart.vue';
import StaticsList from '@/components/staticsMng/StaticsList.vue';
import TheCalendar from '@/components/common/TheCalendar.vue';

// const reports = ref([
//   { todoId: 1, srno:'ServIn1234', requester: '서뚜기', requestTitle: 'dduck@cj.net닷!!', status: '1111', priority: 1, startDt: '2025-10-27', completedDt: '', active: true },
//   { todoId: 2, srno:'ServIn1235', requester: '성뚜기', requestTitle: 'baegi@cj.net닷!!!', status: '1111', priority: 2, startDt: '2025-10-20', completedDt: '2025-10-27', active: false },
// ])

// const filteredReports = ref([...reports.value])

// const handleSearch = (conditions) => {
//   filteredReports.value = reports.value.filter((u) => {
//     // const textMatch = u.name.includes(conditions.text) || u.email.includes(conditions.text)
//     // const deptMatch = conditions.dept ? u.dept === conditions.dept : true
//     // const roleMatch = conditions.role ? u.role === conditions.role : true
//     // const activeMatch = conditions.active ? u.active : true
//     // return textMatch && deptMatch && roleMatch && activeMatch
//     return ''
//   })
// }

const selectedDate = ref(null);

const handleDateSelection = (date) => {
    selectedDate.value = date;
    console.log("선택된 날짜:", date); // YYYY-MM-DD 형식
};
</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-content-wrapper">
      <main class="main-content-area">
        <div class="card user-management-card">
            <div class="card-header-with-button">
                <h3 class="card-title">통계 관리</h3>
           </div>
           <WorkloadProgressChart/>
           <!-- <TheCalendar @date-selected="handleDateSelection" /> -->
            <StaticsList/>
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