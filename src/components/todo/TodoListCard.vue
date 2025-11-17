<script setup>
import { ref, computed , onMounted } from 'vue';
import { useToast } from '@/stores/toast';
import { useTodoStore } from '@/stores/todo';
import TheButton from '@/components/common/TheButton.vue';
import ConfirmModal from '@/components/common/ConfirmModal.vue';
import CreateTodoModal from '@/components/todo/CreateTodoModal.vue';
import ModifyTodoModal from '@/components/todo/ModifyTodoModal.vue';
import axios from 'axios';
import { Pencil, X } from 'lucide-vue-next'
const API_BASE_URL = 'http://localhost:3000'; 

const todoStore = useTodoStore();
const { addToast } = useToast();
const confirmModalRef = ref(null);
const tabs = ref([]);
const statusMap = ref({});
const currentTab = ref(null);
const GRP_ID_FOR_TABS = 'S001';

const fetchStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/com/${GRP_ID_FOR_TABS}`); 
        console.log(response.data);
        
         const fetchedTabs = response.data.map(item => ({
            value: item.CD_ID, 
            label: item.CD_NM 
        }));

        tabs.value = fetchedTabs;

        statusMap.value = fetchedTabs.reduce((acc, item) => {
          acc[item.value] = item.label;
          return acc;
        }, {});

        console.log(statusMap.value);

        if (fetchedTabs.length > 0) {
            currentTab.value = fetchedTabs[0].value;
        }

    } catch (err) {
        console.error('공통코드 정보를 불러오는데 실패하였습니다.', err);
        tabs.value = [{ value: 'error', label: '오류발생' }];
     
    } 
};

const handleTabClick = (tabValue) => {
    if(tabValue == '전체'){
      currentTab.value = '전체';
    } else {
      currentTab.value = tabValue;
    }
    // TODO: 탭이 바뀔 때 데이터를 다시 불러오거나 필터링하는 로직을 여기에 추가
    console.log(`탭변경됨요: ${tabValue}`);
    
};


// 상태 변수
const todos = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchTodos = async () => {
    loading.value = true;
    error.value = null;
    try {
        // 실제 할 일 데이터를 가져오는 API 엔드포인트 호출
        const response = await axios.get(`${API_BASE_URL}/todos`);        
        // DB에서 가져온 배열을 `todos.value`에 저장합니다.
        todos.value = response.data;        
    } catch (err) {
        addToast('할 일 데이터를 불러오는데 실패하였습니다.', 'error', 3000);
        console.error('할 일 데이터를 불러오는데 실패하였습니다.', err);
        error.value = '할 일 데이터를 불러오는데 실패하였습니다.';
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    // 탭 상태와 할 일 데이터를 동시에 가져옵니다.
    await fetchStatus();
    await fetchTodos(); 
});

const filteredTodos = computed(() => {
  const activeTab = tabs.value.find(t => t.value === currentTab.value);

  if (!activeTab) return todos.value;

  if (activeTab.label === '전체') {
    return todos.value;
  }
  //const targetStatus = statusMap.value[currentTab.value];
  return todos.value.filter(todo => todo.status_nm === activeTab.label);
});

const getTodoStatusClass = (status) => {
  switch (status) {
    case '완료': return 'status-completed';
    case '진행': return 'status-in-progress';
    case '반려': return 'status-on-hold';
    case '접수': return 'status-incomplete';
    default: return '';
  }
};

const isCreateModalVisible = ref(false);

const openCreateTodoModal = () => {
  isCreateModalVisible.value = true;
};

const closeCreateTodoModal = () => {
  isCreateModalVisible.value = false;
};

const handleCreateTodo = (formData) => {
  console.log('할 일 생성 완료!:', formData);
    //목록 새로고침
  fetchTodos();
};

const isModifyModalVisible = ref(false);
const selectedTodoId = ref(null);

const openModifyTodoModal = (todo_id = null) => {
  try {
    if (todo_id === null || todo_id === undefined) {
      addToast('게시글 번호 정보가 없습니다.', 'error', 3000);
      return;
    } else {
      selectedTodoId.value = String(todo_id);
    }
    isModifyModalVisible.value = true;
        
  } catch (error) {
    addToast('게시글 정보가 없습니다.', 'error', 3000);
    console.error('openModifyTodoModal 실행 중 처리되지 않은 오류 발생:', error);
  }
};

const closeModifyTodoModal = () => {
  isModifyModalVisible.value = false;
  //목록 새로고침
  fetchTodos();
};

const handleModifyTodo = (formData) => {
  console.log('할 일 저장 완료!:', formData);
};

const deleteTodo = async (todo_id, event) => {
    event.stopPropagation(); //행 클릭 이벤트 방지
    
    const confirmed = await confirmModalRef.value.open('이 게시글을 삭제하시겠습니까?');
    
    if (!confirmed) { // 사용자가 '취소'를 눌렀다면
        addToast('삭제가 취소되었습니다.', 'info', 1500);
        return;
    }

    try {
        if (todo_id === null || todo_id === undefined) {
            addToast('ID 정보를 가져오는데 실패했습니다', 'error', 3000);
        } else {
            await todoStore.deleteTodo(todo_id); 
            addToast('게시물이 삭제되었습니다!', 'success', 3000);
            fetchTodos(); // 목록 새로고침
        }
    } catch (error) {
        addToast('삭제를 실패했습니다', 'error', 3000);
        console.error('삭제 실행 중 처리되지 않은 오류 발생:', error);
    }
};


const calcDiffDays = (start, end) => {
  if (!end) return ''
  if (!start) return ''

  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = endDate.getTime() - startDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
};
</script>

<template>
  <div class="card todo-list-card">
    <div class="card-header-with-button">
      <h3 class="card-title">SR 리스트</h3>
        <div>
        <ConfirmModal ref="confirmModalRef" />
        <ModifyTodoModal :isVisible="isModifyModalVisible":todo_id="selectedTodoId" @close="closeModifyTodoModal" @create="handleModifyTodo" />
        <TheButton type="button" class="add-button open-modal-button" text="새 할 일 추가" @click="openCreateTodoModal" :iconYn="false"/>
        <CreateTodoModal :isVisible="isCreateModalVisible" @close="closeCreateTodoModal" @create="handleCreateTodo" />
       </div>
    </div>

    <div class="tab-buttons">
      <TheButton type="button" v-for="tab in tabs" :key="tab.value" 
      :class="['tab-item', { active: currentTab === tab.value }]" :text="tab.label" @click="handleTabClick(tab.value)" :iconYn="false" />
    </div>

    <div class="todo-table-container">
      <table class="todo-table">
        <thead>
          <tr>
            <th>상태</th>
            <th>요청자 <br>요약</th>
            <th>등록일<br>처리일</br></th>
            <th>완료일</th>
            <th>공수시간</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">데이터를 불러오는 중입니다...</td>
          </tr>
          
          <tr v-else-if="error">
            <td colspan="6" class="text-center error-message">
              {{ error }}
            </td>
          </tr>

          <tr v-else-if="filteredTodos.length === 0">
            <td colspan="6" class="text-center">현재 탭에 해당하는 SR이 없습니다.</td>
          </tr>

          <tr v-for="todo in filteredTodos" :key="todo.todo_id" @click="openModifyTodoModal(todo.todo_id)" :class="getTodoStatusClass(todo.status_nm)" style="cursor: pointer;">
            <td>
              <span v-if="todo.status_nm === '완료'" class="status-icon completed">✔</span>
              <span v-else-if="todo.status_nm === '진행'" class="status-icon in-progress"></span>
              <span v-else-if="todo.status_nm === '반려'" class="status-icon on-hold">▲</span>
              <span v-else-if="todo.status_nm === '접수'" class="status-icon incomplete"></span>
              {{ todo.status_nm }}
            </td>
            <td>
              <p class="todo-summary-title">{{ todo.request_title }}</p>
              <p class="todo-summary-sr">{{ todo.request_content }}</p>
            </td>
            
            <td>
              <p class="todo-date-top">{{ todo.due_dt }}</p>
              <p class="todo-date-bottom">{{ todo.completed_dt}}</p>
            </td>
            <td>
              <p class="todo-effort-top">{{ todo.completed_dt }}</p>
              <p class="todo-effort-bottom"></p>
            </td>
            <td>
              <p class="todo-effort-top">{{ calcDiffDays(todo.completed_dt, todo.due_dt) }}</p>
              <p class="todo-effort-bottom"></p>
            </td>
            <td>
              <button class="icon-button edit" title="수정" @click.stop="openModifyTodoModal(todo.todo_id)" :iconYn="true" >
                <Pencil size="16" />
              </button>
              <button class="icon-button delete" title="삭제" @click.stop="deleteTodo(todo.todo_id, $event)" :iconYn="true" >
                <X size="16" />
              </button>              
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
  overflow: hidden;
}

.todo-table th {
  background-color: #f7f7f7;
  font-weight: bold;
  color: #666;
  white-space: nowrap; /* 헤더 텍스트 줄바꿈 방지 */
}

.todo-table th:nth-child(2),
.todo-table td:nth-child(2) {
    width: 30%; 
    min-width: 150px;
    max-width: 250px; 
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
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;   
}
.todo-summary-sr {
  font-size: 13px;
  color: #777;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;    
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

.text-center {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #888;
}

.error-message {
  color: #dc3545; /* 에러 메시지는 빨간색으로 강조 */
  font-weight: bold;
}

.todo-table tbody tr:hover {
    background-color: #f5f5f5; /* 마우스 오버 시 색상 변화로 클릭 가능 표시 */
    transition: background-color 0.15s ease;
}
</style>