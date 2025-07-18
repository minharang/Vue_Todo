<script setup>
import { ref } from 'vue';
import MembershipFormModal from '../userMng/MembershipForm.vue'; 

const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const isModalVisible = ref(false);

const openMembershipFormModal = () => {
  isModalVisible.value = true;
};

const closeMembershipFormModal = () => {
  isModalVisible.value = false;
};
const handleLogin = () => {
  console.log('로그인 시도:', { username: username.value, password: password.value, rememberMe: rememberMe.value });
  // 여기에 실제 로그인 로직 (API 호출 등)을 추가합니다.
  alert('로그인 시도! (콘솔 확인)');
};
</script>

<template>
  <div class="login-card">
    <h2 class="login-title">로그인</h2>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username" class="sr-only">아이디</label> <input
          type="text"
          id="username"
          v-model="username"
          placeholder="아이디"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password" class="sr-only">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호"
          class="form-input"
        />
      </div>

      <div class="form-group-checkbox">
        <input
          type="checkbox"
          id="rememberMe"
          v-model="rememberMe"
          class="form-checkbox"
        />
        <label for="rememberMe" class="checkbox-label">로그인 상태 유지</label>
      </div>

      <button type="submit" class="login-button">로그인</button>
    </form>

    <div class="login-links">
      <a href="#" class="link-item">비밀번호 찾기</a>
      <span class="link-divider"></span> <a href="#" class="link-item open-modal-button" @click="openMembershipFormModal">회원가입</a>
      <MembershipFormModal :isVisible="isModalVisible" @close="closeMembershipFormModal" />
    </div>
  </div>
</template>

<style scoped>
/* 로그인 카드 컨테이너 */
.login-card {
  background-color: #fff;
  border-radius: 8px; /* 이미지상에서 모서리가 둥글게 보입니다. */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* 그림자 효과 */
  padding: 60px; /* 내부 여백 */
  max-width: 400px; /* 너비 제한 */
  margin: 50px auto; /* 가운데 정렬 및 상단 여백 */
  text-align: center; /* 내부 텍스트 가운데 정렬 (제목 등) */
}

/* 로그인 제목 */
.login-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

/* 폼 그룹 (입력 필드) */
.form-group {
  margin-bottom: 20px;
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

/* 하단 링크 영역 */
.login-links {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.link-item {
  color: #007bff; /* 파란색 링크 */
  text-decoration: none;
  padding: 0 10px; /* 링크 간 간격 */
}

.link-item:hover {
  text-decoration: underline;
}

.link-divider {
  width: 1px;
  height: 15px; /* 이미지상 구분선 길이 */
  background-color: #ccc; /* 구분선 색상 */
  margin: 0 5px; /* 구분선 좌우 여백 */
}

.sr-only {
  display:none;
}
</style>