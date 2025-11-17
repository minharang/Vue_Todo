<script setup>
import { ref } from 'vue';
import TheButton from '@/components/common/TheButton.vue';

const emit = defineEmits(['search'])

const searchData = ref({
  regDate: '',
  summary: '',
  content: '',
  phase: '',
  refDate: '',
  note: '',
  srType: '',
  priority: '',
})

const handleSearch = () => {
  emit('search', searchData.value)
}
</script>
<template>
<div class="search-container">
    <div class="search-row">
        <input v-model="searchData.regDate" type="text" placeholder="등록일" class="search-input" />
        <input v-model="searchData.summary" type="text" placeholder="요약" class="search-input" />
        <input v-model="searchData.content" type="text" placeholder="내용" class="search-input" />
        <select v-model="searchData.phase" class="search-select">
            <option value="">전체</option>
            <option value="나도">나도</option>
            <option value="증말">증말</option>
            <option value="하말">하말</option>
        </select>
        <TheButton text="검색" :iconYn="false" @click="handleSearch" class="add-button"/>
    </div>

    <div class="search-row">
        <input v-model="searchData.refDate" type="text" placeholder="헤헤헤" class="search-input" />
        <input v-model="searchData.note" type="text" placeholder="뭘로검색할거야" class="search-input long" />
        <select v-model="searchData.srType" class="search-select">
            <option value="">상태</option>
            <option>글쎄</option>
            <option>진행</option>
            <option>완료</option>
        </select>
        <select v-model="searchData.priority" class="search-select">
        <option value="">우선순위</option>
        <option>상</option>
        <option>중</option>
        <option>하</option>
        </select>
    </div>
</div>
</template>

<style scoped>
.search-container {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}

.search-row {
  display: flex;
  gap: 0.75rem;
}

.search-input,
.search-select {
  flex: 1;
  min-width: 120px;
  padding: 0.55rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  background: #fff;
  transition: border-color 0.2s ease;
}

.search-input:focus,
.search-select:focus {
  border-color: #3b82f6;
  outline: none;
}

.search-input.long {
  flex: 2;
}

.search-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='%239ca3af' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 1rem;
  padding-right: 2rem;
}
</style>