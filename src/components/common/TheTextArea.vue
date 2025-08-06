<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '' 
  },
  placeholder: {
    type: String,
    default: ''
  },
  row: {
    type: Number,
    default: 5
  },
  modelValue: {
    type: [String, Number], // v-model을 위한 값
    default: ''
  }
});

// 부모 컴포넌트로 이벤트를 발생시킬 emit 함수 정의
const emit = defineEmits(['update:modelValue']);

// 입력 필드 값이 변경될 때 부모에게 알리는 함수
const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
<template>
<!-- <TheTextArea id="필수 속성" label="라벨 텍스트" placeholder="플레이스홀더" v-model="modelValue" :srOnlyLabel="true" :row = "높이"/> -->
  <label :for="id" class="form-label">{{ label }}</label>
    <textarea
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        :row = "row"
        @input="updateValue"
        class="fform-input textarea-input">
    </textarea>
</template>
<style scoped>
.form-label {
  flex-basis: 120px; /* 라벨 고정 너비 */
  font-size: 15px;
  color: #555;
  margin-right: 15px;
  text-align: right; /* 라벨 우측 정렬 */
  flex-shrink: 0; /* 라벨 너비 고정 */
}

.form-input {
  width: calc(100% - 20px); /* 패딩 고려 */
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 6px; /* 입력 필드 모서리 둥글게 */
  font-size: 16px;
  color: #555;
  outline: none; /* 포커스 시 기본 테두리 제거 */
}

.form-input::placeholder {
  color: #aaa;
}

.form-input:focus {
  border-color: #007bff; /* 포커스 시 파란색 테두리 */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.textarea-input {
  resize: vertical; /* 세로 크기만 조절 가능하도록 */
  min-height: 80px; /* 최소 높이 설정 */
  /* form-input의 다른 스타일은 상속받음 */
}
</style>