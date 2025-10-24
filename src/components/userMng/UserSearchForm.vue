<script setup>
import { ref } from 'vue'
import TheButton from '@/components/common/TheButton.vue'

const emit = defineEmits(['search'])
const searchText = ref('')
const selectedDept = ref('')
const selectedRole = ref('')
const isActive = ref(false)

const handleSearch = () => {
  emit('search', {
    text: searchText.value,
    dept: selectedDept.value,
    role: selectedRole.value,
    active: isActive.value,
  })
}
</script>
<template>
<div class="user-filter-row">
    <input type="text" placeholder="검색" v-model="searchText" class="filter-input" />
    <select v-model="selectedDept" class="filter-select">
        <option value="">부서</option>
        <option>개발팀</option>
        <option>운영팀</option>
        <option>지원팀</option>
    </select>
    <select v-model="selectedRole" class="filter-select">
        <option value="">권한</option>
        <option>관리자</option>
        <option>일반</option>
        <option>사원</option>
    </select>
    <label class="filter-checkbox">
        <input type="checkbox" v-model="isActive" /> 활성
    </label>
    <TheButton text="검색" class="add-button" @click="handleSearch" :iconYn="false" />
</div>

</template>

<style scoped>
.user-filter-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.filter-input,
.filter-select {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
}
.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>