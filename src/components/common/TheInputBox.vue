<script setup>

</script>
<template>
<!-- <TextField placeholder="" label="이름" type="password" v-model="inputPwd" hint="" /> -->
<label for="username" class="sr-only">{{ label }}</label>
<input
    type="text"
    id="username"
    v-model="username"
    placeholder="아이디"
    class="form-input"
/>
</template>
<style scoped>
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
</style>