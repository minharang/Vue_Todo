<script setup>
import { useToast } from '@/stores/toast';

// useToast 훅을 사용하여 전역 토스트 상태와 함수를 가져옵니다.
const { toasts, removeToast } = useToast();

// 토스트 유형에 따른 스타일을 결정하는 함수
const getToastStyle = (type) => {
  switch (type) {
    case 'success':
      return { backgroundColor: '#4CAF50' };
    case 'error':
      return { backgroundColor: '#F44336' };
    default:
      return { backgroundColor: '#2196F3' }; // 'info'
  }
};
</script>

<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast-item"
      :style="getToastStyle(toast.type)"
      @click="removeToast(toast.id)"
    >
      <p>{{ toast.message }}</p>
      <button class="close-btn" @click.stop="removeToast(toast.id)">×</button>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 50%; /* 상단에서 50% 위치 */
  left: 50%; /* 왼쪽에서 50% 위치 */
  transform: translate(-50%, -50%); /* 토스트 자체 크기의 50%만큼 되돌려 중앙 정렬 */
  
  z-index: 9999;
  
  /* 여러 개의 토스트가 쌓일 때 세로로 정렬 */
  display: flex;
  flex-direction: column; 
  align-items: center; /* 중앙에 있는 토스트들을 중앙으로 정렬 */
  gap: 10px;
}

.toast-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  min-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.close-btn {
    background: none;
    border: none;
    color: white;
    font-weight: bold;
    margin-left: 15px;
    cursor: pointer;
}
</style>