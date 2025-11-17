<script setup>
import { ref, defineEmits } from 'vue'; // defineProps, defineEmits 임포트
import { useUserStore } from '@/stores/user';
import { useToast } from '@/stores/toast';

// isVisible을 prop으로 받습니다.
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false // 기본값은 false로 설정하여 처음에는 보이지 않도록 합니다.
  }
});

// 부모 컴포넌트로 'close' 이벤트를 발생시키기 위해 defineEmits 사용
const emit = defineEmits(['close', 'create']);
const userStore = useUserStore();
const { addToast } = useToast();

const formData = ref({
  id: '',
  mypassword: '',
  confirmPassword: '',
  name: '',
  mail: '',
  agreeTerms: false
});

// 아이디 중복 상태를 나타내는 반응형 변수
const isIdAvailable = ref(null); // null: 체크 전, true: 사용 가능, false: 중복

const closeModal = () => {
  // isVisible prop을 직접 변경하는 대신, 부모에게 닫기 이벤트를 발생시킵니다.
  emit('close'); 
  // 모달 닫기 시 상태 초기화
  isIdAvailable.value = null;
};

// 아이디 중복 체크 함수
const checkIdDuplication = () => {
  const id = formData.value.id.trim();

  if (!id) {
    alert('아이디를 입력해주세요.');
    isIdAvailable.value = null;
    return;
  }

  console.log(`아이디 '${id}' 중복 체크 중...`);
  setTimeout(() => {
    if (id === 'testuser') { 
      isIdAvailable.value = false;
      alert('이미 사용 중인 아이디입니다.');
    } else {
      isIdAvailable.value = true;
      alert('사용 가능한 아이디입니다.');
    }
  }, 500); 
};

const submitForm = async () => {
  if (isIdAvailable.value === null) {
    alert('아이디 중복 확인을 해주세요.');
    return;
  }
  if (isIdAvailable.value === false) {
    alert('사용 불가능한 아이디입니다. 다른 아이디를 사용해주세요.');
    return;
  }

  console.log('회원가입 정보:', formData.value);
  if (formData.value.mypassword !== formData.value.confirmPassword) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return;
  }
  if (!formData.value.agreeTerms) {
    alert('이용 약관에 동의해야 합니다.');
    return;
  }

  // 서버 필드명에 맞춰 payload 생성
  const payload = {
    user_id: formData.value.id,
    user_name: formData.value.name,
    email: formData.value.mail,
    password: formData.value.mypassword
  };

  try {
    await userStore.createUser(payload);
    addToast('회원가입 완료!', 'success', 3000);

    formData.value = {
      id: '',
      mypassword: '',
      confirmPassword: '',
      name: '',
      mail: '',
      agreeTerms: false
    };
    isIdAvailable.value = null;

    emit('create', payload);
    closeModal();
  } catch (err) {
    console.error('회원가입 실패:', err);
    addToast('회원가입 중 오류가 발생했습니다.', 'error', 3000);
  }
};
</script>

<template>
  <!-- isVisible prop의 값에 따라 모달을 렌더링합니다. -->
  <div v-if="props.isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">회원가입</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>

      <div class="modal-body">
        
        <div class="form-row">
          <label for="id" class="form-label">아이디</label>
          <div class="input-with-button">
            <input type="text" id="id" v-model="formData.id" class="form-input" placeholder="아이디를 입력하세요">
            <button type="button" class="check-button" @click="checkIdDuplication">중복체크</button>
          </div>
          <p v-if="isIdAvailable === true" class="id-status-message success-message">사용 가능한 아이디입니다.</p>
          <p v-else-if="isIdAvailable === false" class="id-status-message error-message">이미 사용 중인 아이디입니다.</p>
        </div>

        <div class="form-row">
          <label for="mypassword" class="form-label">비밀번호</label>
          <input type="password" id="mypassword" v-model="formData.mypassword" class="form-input" placeholder="비밀번호를 입력하세요">
        </div>
        
        <div class="form-row">
          <label for="confirmPassword" class="form-label">비밀번호 확인</label>
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" class="form-input" placeholder="비밀번호 확인을 입력하세요">
        </div>

        <div class="form-row">
          <label for="name" class="form-label">이름</label>
          <input type="text" id="name" v-model="formData.name" class="form-input" placeholder="이름을 입력하세요">
        </div>

        <div class="form-row">
          <label for="email" class="form-label">이메일</label>
          <input type="text" id="mail" v-model="formData.mail" class="form-input" placeholder="이메일을 입력하세요">
        </div>

        <div class="form-row checkbox-group">
          <input type="checkbox" id="terms" v-model="formData.agreeTerms">
          <label for="terms">이용 약관에 동의합니다</label>
        </div>

      </div>

      <div class="modal-footer">
        <button class="button button-cancel" @click="closeModal">취소</button>
        <button class="button button-create" @click="submitForm">가입</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 콘텐츠 위에 표시 */
}

/* 모달 컨테이너 */
.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px; 
  display: flex;
  flex-direction: column;
  overflow: hidden; 
  max-height: 90vh; 
}

/* 모달 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #eee;
  background-color: #f7f7f7; 
  flex-shrink: 0; 
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  padding: 0;
  line-height: 1; 
  transform: translateY(-2px); 
}

.close-button:hover {
  color: #333;
}

/* 모달 본문 (폼) */
.modal-body {
  padding: 20px;
  overflow-y: auto; 
  flex-grow: 1; 
}

.form-row {
  display: flex;
  align-items: center; 
  margin-bottom: 18px; 
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input::placeholder {
  color: #aaa;
}

.form-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* 아이디 입력 필드와 버튼을 위한 flex 컨테이너 */
.input-with-button {
  display: flex;
  flex-grow: 1;
  gap: 8px; /* 입력 필드와 버튼 사이 간격 */
  align-items: center;
}

.input-with-button .form-input {
    flex-grow: 1; 
    flex-shrink: 2; 
}

/* 중복체크 버튼 스타일 */
.check-button {
  background-color: #6c757d; 
  color: #fff;
  padding: 9px 15px; 
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap; 
  flex-shrink: 0; 
  transition: background-color 0.2s ease;
}

.check-button:hover {
  background-color: #5a6268;
}

/* 아이디 중복 체크 결과 메시지 스타일 */
.id-status-message {
    font-size: 13px;
    margin-top: 5px; 
    margin-left: calc(120px + 15px); 
}

.success-message {
    color: #28a745; 
}

.error-message {
    color: #dc3545; 
}


.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 30px;
  padding-left: calc(120px + 15px); 
}

.checkbox-group input[type="checkbox"] {
  margin-right: 10px; 
  width: 18px; 
  height: 18px;
  cursor: pointer;
  accent-color: #007bff; 
}

.checkbox-group label {
  font-size: 15px; 
  color: #555; 
  cursor: pointer;
  flex-basis: auto; 
  text-align: left;
  margin-right: 0;
}


/* 모달 푸터 */
.modal-footer {
  display: flex;
  justify-content: flex-end; 
  padding: 20px 25px;
  border-top: 1px solid #eee;
  gap: 10px; 
  background-color: #f7f7f7;
  flex-shrink: 0; 
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
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

/* 미디어 쿼리 (모바일 반응형) */
@media (max-width: 768px) {
  .modal-container {
    max-width: 95%; 
    margin: 15px; 
  }

  .modal-header {
      padding: 15px 20px;
  }
  .modal-title {
      font-size: 18px;
  }
  .close-button {
      font-size: 24px;
  }

  .modal-body {
      padding: 15px;
  }

  .form-row {
    flex-direction: column; 
    align-items: flex-start; 
    margin-bottom: 15px;
  }

  .form-label {
    width: 100%; 
    text-align: left; 
    margin-bottom: 8px; 
    margin-right: 0;
    font-size: 14px;
  }

  .form-input {
    width: 100%; 
    font-size: 14px;
    padding: 8px 10px;
  }

  /* 아이디 입력 필드와 버튼 그룹 */
  .input-with-button {
      width: 100%; 
      flex-wrap: nowrap; 
      gap: 5px; 
  }
  .input-with-button .form-input {
      flex-grow: 1; 
      flex-shrink: 1; 
  }
  .check-button {
      padding: 8px 12px; 
      font-size: 13px;
  }

  /* 아이디 중복 체크 메시지 */
  .id-status-message {
      margin-left: 0; 
      width: 100%; 
      text-align: left;
      margin-top: 3px;
  }


  .checkbox-group {
    padding-left: 0; 
    flex-direction: row; 
    align-items: center;
    justify-content: flex-start; 
    width: 100%; 
  }

  .modal-footer {
      padding: 15px 20px;
      flex-direction: column; 
      gap: 10px;
  }

  .button {
      width: 100%; 
      padding: 12px;
      font-size: 15px;
  }
}
</style>