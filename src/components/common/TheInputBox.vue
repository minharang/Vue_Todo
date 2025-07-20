<script setup>

</script>
<template>
<!-- <TextField placeholder="" label="비밀번호" type="password" v-model="inputPwd" hint="" /> -->
<label for="username" class="sr-only">아이디</label>
<input
    type="text"
    id="username"
    v-model="username"
    placeholder="아이디"
    class="form-input"
/>
</template>
<style scoped></style>