<script setup>
import { ref } from 'vue'
import TheButton from '@/components/common/TheButton.vue'
import UserSearchForm from '@/components/userMng/UserSearchForm.vue';
import UserList from '@/components/userMng/UserList.vue';

const users = ref([
  { userId: 1, userName: '밍밍`', email: 'ming@cj.net', deptId: '대한통운 WMS팀', authGrpId: '일반', lastLoginedDt: '2025-01-01 00:00:00', lockedYn: true },
  { userId: 2, userName: '밍밍2', email: 'ming.ming@cj.net', deptId: '대한통운 TCS팀',  authGrpId: '관리자', lastLoginedDt: '2025.10.27 15:30:00', lockedYn: false },
])

const filteredUsers = ref([...users.value])

const handleSearch = (conditions) => {
  filteredUsers.value = users.value.filter((u) => {
    // const textMatch = u.name.includes(conditions.text) || u.email.includes(conditions.text)
    // const deptMatch = conditions.dept ? u.dept === conditions.dept : true
    // const roleMatch = conditions.role ? u.role === conditions.role : true
    // const activeMatch = conditions.active ? u.active : true
    // return textMatch && deptMatch && roleMatch && activeMatch
    return '';
  })
}

const addUser = () => {
  alert('사용자 추가 기능 준비 중입니다.')
}
</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-content-wrapper">
      <main class="main-content-area">
        <div class="card user-management-card">
            <div class="card-header-with-button">
                <h3 class="card-title">사용자 관리</h3>
                <TheButton class="add-button" text="사용자 추가" @click="addUser" :iconYn="false" /> <!--회원관리 폼...? 넣으면 될듯-->
            </div>

            <UserSearchForm @search="handleSearch" />
            <UserList :users="filteredUsers" />
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