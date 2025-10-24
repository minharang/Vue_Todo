<script setup>
import { ref } from 'vue'
import TheButton from '@/components/common/TheButton.vue'
import UserSearchForm from './UserSearchForm.vue';
import UserList from './UserList.vue';

const users = ref([
  { id: 1, name: '홍길동', email: 'hong@test.com', dept: '개발팀', position: '사원', role: '일반', joinDate: '2023-01-10', active: true },
  { id: 2, name: '김지현', email: 'kim@test.com', dept: '운영팀', position: '대리', role: '관리자', joinDate: '2022-08-20', active: false },
])

const filteredUsers = ref([...users.value])

const handleSearch = (conditions) => {
  filteredUsers.value = users.value.filter((u) => {
    const textMatch = u.name.includes(conditions.text) || u.email.includes(conditions.text)
    const deptMatch = conditions.dept ? u.dept === conditions.dept : true
    const roleMatch = conditions.role ? u.role === conditions.role : true
    const activeMatch = conditions.active ? u.active : true
    return textMatch && deptMatch && roleMatch && activeMatch
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