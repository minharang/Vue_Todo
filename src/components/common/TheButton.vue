<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['submit']);

const handleClick = () => {
  emit('submit');
};
</script>
<template>
    <!-- <TheButton @submit="handleLogin" /> -->
    <button type="submit" class="login-button" @click="handleClick">버튼은 작업중</button>
</template>
<style scoped>
/* 로그인 버튼 */
.login-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff; /* 이미지 상의 파란색 버튼 */
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 25px; /* 하단 링크와의 간격 */
}

.login-button:hover {
  background-color: #0056b3; /* 호버 시 약간 더 진한 파란색 */
}
</style>