<script setup>
import { ref, computed } from 'vue';
import CreateTodoModal from '../todo/CreateTodoModal.vue'; 

const tabs = [
  { label: '전체보기', value: 'all' },
  { label: '진행중', value: 'in-progress' },
  { label: '보류', value: 'on-hold' },
  { label: '미완료', value: 'incomplete' },
  { label: '완료', value: 'completed' }
];
const currentTab = ref('all'); // 현재 활성화된 탭

const todos = ref([
  {
    id: 1,
    status: '완료',
    summary: { title: '첫 번째 작업', srNo: 'SR-004' },
    regDate: { start: '2024-24', end: '2024-25' },
    completionDate: { planned: '2024-24', actual: '2024-25' },
    effortTime: { planned: '6.0 h', actual: '6.0 h / 7 h' }
  },
  {
    id: 2,
    status: '진행중',
    summary: { title: '두 번째 작업', srNo: 'SR-003' },
    regDate: { start: '2024-24', end: '' },
    completionDate: { planned: '2024-24', actual: '24' },
    effortTime: { planned: '3.0 / -', actual: '3.0 h / -' }
  },
  {
    id: 3,
    status: '보류',
    summary: { title: '세 번째 작업', srNo: 'SR-002' },
    regDate: { start: '2024-22', end: '' },
    completionDate: { planned: '- / -', actual: '- / -' },
    effortTime: { planned: '- / -', actual: '- / -' }
  },
  {
    id: 4,
    status: '미완료',
    summary: { title: '네 번째 작업', srNo: 'SR-001' },
    regDate: { start: '2024-24', end: '2024-21' },
    completionDate: { planned: '- / 2.5h', actual: '2.5h' },
    effortTime: { planned: '- / 2.5h', actual: '2.5h' }
  }
  // 더 많은 할 일 데이터 추가
]);

const filteredTodos = computed(() => {
  if (currentTab.value === 'all') {
    return todos.value;
  }
  const statusMap = {
    'in-progress': '진행중',
    'on-hold': '보류',
    'incomplete': '미완료',
    'completed': '완료'
  };
  const targetStatus = statusMap[currentTab.value];
  return todos.value.filter(todo => todo.status === targetStatus);
});

const addTodo = () => {
  console.log('추가 버튼 클릭');
  // 여기에 할 일 추가 모달을 여는 로직 (예: emit('openCreateTodoModal'))
  // 또는 Vue Router를 이용한 페이지 이동 로직을 추가합니다.
};

const getTodoStatusClass = (status) => {
  switch (status) {
    case '완료': return 'status-completed';
    case '진행중': return 'status-in-progress';
    case '보류': return 'status-on-hold';
    case '미완료': return 'status-incomplete';
    default: return '';
  }
};

const isModalVisible = ref(false);

const openCreateTodoModal = () => {
  isModalVisible.value = true;
};

const closeCreateTodoModal = () => {
  isModalVisible.value = false;
};

const handleCreateTodo = (formData) => {
  console.log('할 일 생성 완료!:', formData);
  // 여기에 실제 할 일 목록에 데이터를 추가하는 로직을 구현합니다.
  alert('할 일이 성공적으로 생성되었습니다!');
};
</script>

<template>
  <div class="card todo-list-card">
    <div class="card-header-with-button">
      <h3 class="card-title">TODO 리스트</h3>
      <!-- <button class="add-button" @click="addTodo">추가</button> -->
       <button @click="openCreateTodoModal" class="add-button open-modal-button">새 할 일 추가</button>
       <CreateTodoModal :isVisible="isModalVisible" @close="closeCreateTodoModal" @create="handleCreateTodo" />
    </div>

    <div class="tab-buttons">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab-item', { active: currentTab === tab.value }]"
        @click="currentTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="todo-table-container">
      <table class="todo-table">
        <thead>
          <tr>
            <th>상태</th>
            <th>요약</th>
            <th>등록일</th>
            <th>완료일</th>
            <th>공수시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in filteredTodos" :key="todo.id" :class="getTodoStatusClass(todo.status)">
            <td>
              <span v-if="todo.status === '완료'" class="status-icon completed">✔</span>
              <span v-else-if="todo.status === '진행중'" class="status-icon in-progress"></span>
              <span v-else-if="todo.status === '보류'" class="status-icon on-hold">▲</span>
              <span v-else-if="todo.status === '미완료'" class="status-icon incomplete"></span>
              {{ todo.status }}
            </td>
            <td>
              <p class="todo-summary-title">{{ todo.summary.title }}</p>
              <p class="todo-summary-sr">{{ todo.summary.srNo }}</p>
            </td>
            <td>
              <p class="todo-date-top">{{ todo.regDate.start }}</p>
              <p class="todo-date-bottom">{{ todo.regDate.end }}</p>
            </td>
            <td>
              <p class="todo-date-top">{{ todo.completionDate.planned }}</p>
              <p class="todo-date-bottom">{{ todo.completionDate.actual }}</p>
            </td>
            <td>
              <p class="todo-effort-top">{{ todo.effortTime.planned }}</p>
              <p class="todo-effort-bottom">{{ todo.effortTime.actual }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

.card-header-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

/* 탭 버튼 */
.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee; /* 탭 아래 구분선 */
  padding-bottom: 10px; /* 탭과 구분선 간격 */
}

.tab-item {
  background-color: #f0f0f0;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-item:hover {
  background-color: #e0e0e0;
}

.tab-item.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.2);
}

/* TODO 테이블 */
.todo-table-container {
  overflow-x: auto; /* 테이블 내용이 넘칠 경우 스크롤바 생성 */
}

.todo-table {
  width: 100%;
  border-collapse: collapse; /* 셀 경계선 병합 */
}

.todo-table th,
.todo-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
  vertical-align: top; /* 셀 내용 상단 정렬 */
  font-size: 14px;
  color: #333;
}

.todo-table th {
  background-color: #f7f7f7;
  font-weight: bold;
  color: #666;
  white-space: nowrap; /* 헤더 텍스트 줄바꿈 방지 */
}

/* 상태 아이콘 및 텍스트 */
.status-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}

.status-completed {
  color: #28a745; /* 초록색 체크 */
  font-size: 18px;
  line-height: 1;
}

.status-in-progress .status-icon {
  background-color: #ffc107; /* 노란색 점 */
}

.status-on-hold .status-icon {
  color: #ff9800; /* 주황색 삼각형 */
  font-size: 18px;
  vertical-align: middle;
}

.status-incomplete .status-icon {
  background-color: #dc3545; /* 빨간색 점 */
}

/* 각 행의 상태별 스타일 */
.todo-table tbody tr.status-completed td {
  color: #666; /* 완료된 항목은 약간 연하게 */
}
.todo-table tbody tr.status-incomplete td {
  color: #dc3545; /* 미완료 항목 빨간색 */
  font-weight: bold;
}

/* 요약 SR 번호 */
.todo-summary-title {
  font-weight: bold;
  margin-bottom: 3px;
  color: #333;
}
.todo-summary-sr {
  font-size: 13px;
  color: #777;
}

/* 날짜 및 공수시간 두 줄 표시 */
.todo-date-top, .todo-effort-top {
  margin-bottom: 3px;
  font-weight: bold;
}
.todo-date-bottom, .todo-effort-bottom {
  font-size: 13px;
  color: #777;
}

/* 모바일 반응형 (TODO 리스트 카드) */
@media (max-width: 768px) {
  .card-header-with-button {
    flex-direction: column;
    align-items: flex-start;
  }
  .card-title {
    margin-bottom: 15px;
  }
  .tab-buttons {
    flex-wrap: wrap; /* 탭 버튼 줄바꿈 */
    justify-content: center;
    gap: 8px;
  }
  .tab-item {
    flex-grow: 1; /* 버튼들이 균등하게 공간 차지 */
    text-align: center;
  }
  /* 테이블은 overflow-x: auto로 스크롤 가능하게 유지 */
  .todo-table th, .todo-table td {
    padding: 8px 10px;
    font-size: 13px;
  }
}

</style>