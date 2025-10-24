<script setup>
import { defineProps } from 'vue'
import TheButton from '@/components/common/TheButton.vue'

const props = defineProps({
  users: Array,
})
</script>
<template>
<div class="user-table-container">
    <table class="user-table">
        <thead>
        <tr>
            <th>이름</th><th>이메일</th><th>부서</th><th>직무</th>
            <th>권한</th><th>가입일</th><th>상태</th><th>작업</th>
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
            <td class="action-buttons">
            <TheButton text="수정" class="button-cancel":iconYn="false" />
            <TheButton text="삭제" class="button-delete" :iconYn="false" />
            </td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.user-table th, .user-table td {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
}
.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.status-dot.active { background: #22c55e; }
.status-dot.inactive { background: #9ca3af; }
.action-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>