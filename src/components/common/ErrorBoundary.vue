<template>
  <div>
    <slot v-if="!hasError" />
    <div v-else class="error-boundary">
      <h3>오류 발생</h3>
      <p>{{ message }}</p>
      <button @click="recover">홈으로</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { hasError: false, message: '' }
  },
  methods: {
    recover() {
      this.hasError = false
      this.message = ''
      this.$router.push('/Home').catch(()=>{})
    }
  },
  errorCaptured(err, vm, info) {
    console.error('Component errorCaptured:', err, info)
    this.hasError = true
    this.message = err?.message || '컴포넌트 렌더 중 오류가 발생했습니다.'
    // true를 반환하면 상위로 에러를 전파하지 않음
    return false
  }
}
</script>

<style scoped>
.error-boundary { padding:16px; border:1px solid #f44; background:#fff0f0; }
</style>