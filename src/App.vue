<script setup>
import TheHeader from '@/components/common/TheHeader.vue';
import { RouterView } from 'vue-router';
import ErrorBoundary from '@/components/common/ErrorBoundary.vue'
import { computed } from 'vue'
import { useErrorStore } from '@/stores/errorStore'

const errorStore = useErrorStore()
const error = computed(() => errorStore.lastError)
const clearError = () => errorStore.clearError()
</script>

<template>
  <TheHeader />

  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>

  <!-- 전역 에러 UI: Pinia error store에서 표시 -->
  <div v-if="error" class="global-error">
    <p>{{ error.message }}</p>
    <button @click="clearError">닫기</button>
  </div>
</template>

<style scoped>
/* App.vue 또는 전역 스타일 */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f7f6;
}

h1 {
  text-align: center;
  margin-top: 50px;
  color: #333;
}

.open-modal-button {
  display: block;
  margin: 30px auto;
  padding: 12px 25px;
  background-color: #28a745; /* 녹색 버튼 */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.open-modal-button:hover {
  background-color: #218838;  
}

.global-error { position:fixed; bottom:16px; right:16px; background:#222; color:#fff; padding:10px; border-radius:6px; }
</style>