<script setup>
import { ref } from 'vue'
import TheButton from '@/components/common/TheButton.vue'
import CreateTodoModal from '@/components/todo/CreateTodoModal.vue';
import SrSearchForm from './SrSearchForm.vue';
import SrList from './SrList.vue';

const srs = ref([
  { todoId: 1, srno:'ServIn1234', requester: '서뚜기', requestTitle: 'dduck@cj.net닷!!', status: '1111', priority: 1, startDt: '2025-10-27', completedDt: '', active: true },
  { todoId: 2, srno:'ServIn1235', requester: '성뚜기', requestTitle: 'baegi@cj.net닷!!!', status: '1111', priority: 2, startDt: '2025-10-20', completedDt: '2025-10-27', active: false },
])

const filteredSrs = ref([...srs.value])

const handleSearch = (conditions) => {
  filteredSrs.value = srs.value.filter((u) => {
    // const textMatch = u.name.includes(conditions.text) || u.email.includes(conditions.text)
    // const deptMatch = conditions.dept ? u.dept === conditions.dept : true
    // const roleMatch = conditions.role ? u.role === conditions.role : true
    // const activeMatch = conditions.active ? u.active : true
    // return textMatch && deptMatch && roleMatch && activeMatch
    return ''
  })
}

const isCreateModalVisible = ref(false);

const openCreateTodoModal = () => {
  isCreateModalVisible.value = true;
};

const closeCreateTodoModal = () => {
  isCreateModalVisible.value = false;
};

const handleCreateTodo = (formData) => {
  console.log('할 일 생성 완료!:', formData);
  // 여기에 실제 할 일 목록에 데이터를 추가하는 로직을 구현합니다.
  alert('할 일이 성공적으로 생성되었습니다!');
};

</script>

<template>
  <div class="dashboard-layout">
    <div class="dashboard-content-wrapper">
      <main class="main-content-area">
        <div class="card user-management-card">
            <div class="card-header-with-button">
                <h3 class="card-title">SR 관리</h3>
                <TheButton type="button" class="add-button open-modal-button" text="SR 추가" @click="openCreateTodoModal" :iconYn="false"/>
                <CreateTodoModal :isVisible="isCreateModalVisible" @close="closeCreateTodoModal" @create="handleCreateTodo" />
            </div>
            <SrSearchForm @search="handleSearch" />
            <SrList :srs="filteredSrs" />
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