<script setup>
import { defineProps } from 'vue'
import { Pencil, X } from 'lucide-vue-next'  /* TODO. npm i lucide-vue-next 설치 confluence에 적을것!!! 잊지말고... */
const props = defineProps({
  users: Array,
})
</script>
<template>
<div class="user-table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>부서</th>
          <th>직무</th>
          <th>권한</th>
          <th>가입일</th>
          <th>상태</th>
          <th>작업</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dept }}</td>
          <td>{{ user.position }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.joinDate }}</td>
          <td>
            <span :class="['status-dot', user.active ? 'active' : 'inactive']"></span>
          </td>
          <td class="action-icons">
            <button class="icon-button edit" title="수정">
              <Pencil size="16" />
            </button>
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