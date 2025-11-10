<script setup>
import { defineProps, ref, computed , onMounted } from 'vue'
import ModifyTodoModal from '@/components/todo/ModifyTodoModal.vue';
import { Pencil, X } from 'lucide-vue-next'  /* TODO. npm i lucide-vue-next 설치 confluence에 적을것!!! 잊지말고... */
const props = defineProps({
  srs: Array,
})

const isModifyModalVisible = ref(false);
const selectedTodoId = ref(null);

const openModifyTodoModal = (todo_id = null) => {
  try {
    if (todo_id === null || todo_id === undefined) {
      console.log('안들어왔어 todo_id');
      selectedTodoId.value = '1';
    } else {
      console.log('todo_id 잘 들어왔니 : ' + todo_id);
      selectedTodoId.value = todo_id;
    }
    isModifyModalVisible.value = true;
        
  } catch (error) {
    console.error('openModifyTodoModal 실행 중 처리되지 않은 오류 발생:', error);
  }
};

const closeModifyTodoModal = () => {
  isModifyModalVisible.value = false;
};

const handleModifyTodo = (formData) => {
  console.log('할 일 저장 완료!:', formData);
  alert('할 일이 성공적으로 저장되었습니다!');
};


</script>
<template>
<div class="user-table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>Sr No</th>
          <th>요청자</th>
          <th>제목</th>
          <th>진행상태</th>
          <th>우선순위</th>
          <th>시작일</th>
          <th>종료일</th>
          <th>상태</th>
          <th>작업</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="sr in srs" :key="sr.todoId">
          <td>{{ sr.srno }}</td>
          <td>{{ sr.requester }}</td>
          <td>{{ sr.requestTitle }}</td>
          <td>{{ sr.status }}</td>
          <td>{{ sr.priority }}</td>
          <td>{{ sr.startDt }}</td>
          <td>{{ sr.completedDt }}</td>
          <td>
            <span :class="['status-dot', sr.active ? 'active' : 'inactive']"></span>
          </td>
          <td class="action-icons">
            <button class="icon-button edit" title="수정" @click="openModifyTodoModal('7')" :iconYn="true" >
              <Pencil size="16" />
            </button>
            <ModifyTodoModal :isVisible="isModifyModalVisible":todo_id="selectedTodoId" @close="closeModifyTodoModal" @create="handleModifyTodo" />            
            <button class="icon-button delete" title="삭제">
              <X size="16" />
            </button>
          </td>
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