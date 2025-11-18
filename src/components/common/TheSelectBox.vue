<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => value.every(option => 
      typeof option.value !== 'undefined' && typeof option.text === 'string'
    )
  },
  placeholder: {
    type: String,
    default: '선택하세요'
  }
});

const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>
<template>
    <div class="select-box-wrapper">
    <label 
      :for="id" 
      class="form-label" 
    >
      {{ label }}
    </label>
    
    <select 
      :id="id" 
      v-model="localValue" 
      class="form-input"
      :class="selectClass"
    >
      <option value="" disabled>{{ placeholder }}</option> 
      
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.select-box-wrapper {
  flex-grow: 1; 
  display: flex;
  align-items: center;
  width: 100%; 
  position: relative;
}

.select-box-wrapper::after {
    content: "▼"; 
    
    font-size: 13px;
    color: #666;
    
    position: absolute;
    right: 23px; 
    top: 50%;
    transform: translateY(-50%);

    pointer-events: none;
}

.form-label {
    flex-basis: 120px; 
    font-size: 15px;
    color: #555;
    margin-right: 15px;
    text-align: right;
    flex-shrink: 0;
}

.form-input {
    flex-grow: 1; 
    padding: 10px 7px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 15px;
    color: #333;
    outline: none;
    background-color: #fff; 
    -webkit-appearance: none;
    -moz-appearance: none;  
    appearance: none;      
    padding-right: 30px;
}

.form-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}


@media (max-width: 768px) {
  .select-box-wrapper::after {
    right: 30px; 
  }
}
</style>