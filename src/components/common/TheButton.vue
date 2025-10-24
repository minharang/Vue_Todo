<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import TheLoader from '@/components/common/TheLoader.vue';

const props = defineProps({
  text: {
    type: String,
    default: '' 
  },
  type: {
    type: String,
    default: 'button' 
  },
  disabled: {
    type: Boolean,
    default: false 
  },
  iconYn: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

// 버튼 클릭 시 이벤트 발생 함수
const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
    
  }
};

</script>

<template>
  <!-- <TheButton type="입력 필드 타입" text="버튼 이름" @click="클릭이벤트" :iconYn="아이콘 여부-false는 생략가능" :loading="로딩 상태"/> -->
  
  <button :type="type" :disabled="disabled" @click="handleClick" v-if="iconYn" >
    <span class="moon-icon">
      {{ text }}
    </span>
  </button>

  <button :type="type" :disabled="disabled" @click="handleClick" v-else>
   {{ text }}
  </button>


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

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  padding: 0;
  line-height: 1; /* x 버튼 세로 정렬 */
  transform: translateY(-2px); /* 약간 위로 올리기 */
}

.close-button:hover {
  color: #333;
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

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 24px; /* 달 이모지 크기 */
}

.moon-icon {
  color: #fdd835; /* 달 색상 */
}

.logout-button {
  background: none;
  border: 1px solid #c0c0c0;
  color: #c0c0c0;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #c0c0c0;
  color: #34495e;
}

.button-delete {
  background-color: #dc3545; 
  color: #fff;
}

.button-delete:hover {
  background-color: #c82333;
}

.button-cancel {
  background-color: #e0e0e0;
  color: #555;
}

.button-cancel:hover {
  background-color: #d0d0d0;
}

.button-create {
  background-color: #007bff;
  color: #fff;
}

.button-create:hover {
  background-color: #0056b3;
}

</style>