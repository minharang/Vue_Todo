<script>
import { reactive } from 'vue'; // reactive를 임포트합니다.

// 이벤트를 정의합니다. Options API의 emits 옵션과 동일합니다.
const emits = defineEmits(['submit-success', 'cancel']);

// formData를 반응형 객체로 선언합니다.
const formData = reactive({
  id: '',
  password: '',
  confirmPassword: '',
  name: '',
  email: '',
  phone: '',
  agreeTerms: false
});

// handleSubmit 함수
const handleSubmit = () => {
  // 기본적인 유효성 검사
  if (formData.password !== formData.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  if (!formData.agreeTerms) {
    alert('이용 약관에 동의해야 합니다.');
    return;
  }

  console.log('Form Submitted:', formData);
  // defineEmits로 정의한 emits 함수를 사용하여 이벤트 발생
  emits('submit-success', formData);
};

// handleCancel 함수
const handleCancel = () => {
  // defineEmits로 정의한 emits 함수를 사용하여 이벤트 발생
  emits('cancel');
};
</script>

<template>
   <div class="membership-form">
    <h2 class="form-title">회원가입</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="formData.id" required>
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="formData.password" required>
      </div>

      <div class="form-group">
        <label for="confirmPassword">비밀번호 확</label>
        <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required>
      </div>

      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>

      <div class="form-group">
        <label for="phone">전화번호</label>
        <input type="tel" id="phone" v-model="formData.phone" placeholder="예: 010-1234-5678" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required>
      </div>

      <div class="form-group checkbox-group">
        <input type="checkbox" id="terms" v-model="formData.agreeTerms" required>
        <label for="terms">이용 약관에 동의합니다</label>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" @click="handleCancel">가입</button>
        <button type="submit" class="btn btn-primary">가입</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 회원가입 폼을 위한 스코프 스타일 */
.membership-form {
  width: 100%;
}

.form-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  text-align: left;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 0.95em;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group input[type="email"],
.form-group input[type="tel"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  color: #333;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus,
.form-group input[type="email"]:focus,
.form-group input[type="tel"]:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

/* 체크박스 전용 스타일링 */
.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
  width: 18px;
  height: 18px;
  min-width: 18px; /* 축소 방지 */
  min-height: 18px; /* 축소 방지 */
  accent-color: #3498db; /* 체크박스 색상 변경 */
  cursor: pointer;
}

.checkbox-group label {
  margin-bottom: 0; /* 기본 라벨 여백 재정의 */
  cursor: pointer;
  font-size: 0.9em;
  color: #666;
}

/* 폼 액션 (버튼) */
.form-actions {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
  gap: 10px; /* 버튼 간 간격 */
  margin-top: 30px;
}

.btn {
  padding: 12px 25px;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  min-width: 80px; /* 버튼 최소 너비 보장 */
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
  border: 1px solid #3498db;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #555;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
  border-color: #ccc;
}

/* 입력 필드 및 라벨을 위한 반응형 조정 */
@media (max-width: 480px) {
  .form-group label {
    font-size: 0.9em;
  }

  .form-group input {
    padding: 10px;
    font-size: 0.95em;
  }

  .btn {
    padding: 10px 20px;
    font-size: 0.9em;
    min-width: unset; /* 아주 작은 화면에서 버튼 축소 허용 */
  }

  .form-actions {
    flex-direction: column; /* 버튼 세로로 쌓기 */
    gap: 10px;
  }

  .form-actions .btn {
    width: 100%; /* 쌓였을 때 버튼 전체 너비 */
  }
}
</style>
