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
  modelValue: {
    type: Boolean,  // v-model을 위한 값
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.checked);
};
</script>
<template>
    <!-- <TheCheckBox id="필수 속성" label="라벨 텍스트" v-model="modelValue" />  -->
    <div class="form-group-checkbox">
        <input
            type="checkbox"
            :id="id"
            :checked="modelValue"
            @change="updateValue"
            class="form-checkbox"
        />
        <label :for="id" class="checkbox-label">{{ label }}</label>
    </div>
</template>
<style scoped>
/* 로그인 상태 유지 체크박스 */
.form-group-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 왼쪽 정렬 */
  margin-bottom: 30px;
  margin-left: 5px; /* 입력 필드와의 정렬을 위해 살짝 조정 */
}

.form-checkbox {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
}

.checkbox-label {
  font-size: 15px;
  color: #555;
  cursor: pointer;
}
</style>