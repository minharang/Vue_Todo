<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'create']);

const formData = ref({
  importance: 'low',
  priority: '',
  regDate: '',
  regDateEnd: '', // 등록일 옆에 하나 더 있는 입력 필드
  completionDate: '',
  remindCompletionDate: '',
  mistranslation: '',
  effortTime: '',
  noteEffortTime: '', // 기입할 공수시간
  requester: ''
});

const closeModal = () => {
  emit('close');
};

const createTodo = () => {
  console.log('할 일 생성 데이터:', formData.value);
  // 여기에 할 일 생성 로직 (API 호출 등)을 추가합니다.
  emit('create', formData.value);
  closeModal(); // 생성 후 모달 닫기
};
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">할 일 생성</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>

      <div class="modal-body">
        <div class="form-row">
          <label class="form-label">중요도</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="importance" value="low" v-model="formData.importance" class="radio-input"> 낮음
            </label>
            <label class="radio-label">
              <input type="radio" name="importance" value="high" v-model="formData.importance" class="radio-input"> 높음
            </label>
          </div>
        </div>

        <div class="form-row">
          <label for="priority" class="form-label">우선순위</label>
          <input type="text" id="priority" v-model="formData.priority" class="form-input">
        </div>

        <div class="form-row">
          <label for="regDate" class="form-label">등록일</label>
          <div class="input-with-icon">
            <input type="date" id="regDate" v-model="formData.regDate" class="form-input date-input">
            <span class="icon-calendar">📅</span> <input type="date" id="regDateEnd" v-model="formData.regDateEnd" class="form-input date-input ml-10">
            <span class="icon-calendar">📅</span> </div>
        </div>

        <div class="form-row">
          <label for="completionDate" class="form-label">완료일</label>
          <input type="date" id="completionDate" v-model="formData.completionDate" class="form-input">
        </div>

        <div class="form-row">
          <label for="remindCompletionDate" class="form-label">독촉완료일</label>
          <input type="date" id="remindCompletionDate" v-model="formData.remindCompletionDate" class="form-input">
        </div>

        <div class="form-row">
          <label for="mistranslation" class="form-label">오역</label>
          <input type="text" id="mistranslation" v-model="formData.mistranslation" class="form-input">
        </div>

        <div class="form-row">
          <label class="form-label">SR번호</label>
          <p class="read-only-text">자동 계산</p>
        </div>

        <div class="form-row">
          <label for="effortTime" class="form-label">공수시간</label>
          <div class="input-two-fields">
            <input type="text" id="effortTime" v-model="formData.effortTime" class="form-input short-input">
            <input type="text" placeholder="공수시간" v-model="formData.noteEffortTime" class="form-input long-input">
          </div>
        </div>

        <div class="form-row">
          <label for="requester" class="form-label">요청자</label>
          <input type="text" id="requester" v-model="formData.requester" class="form-input">
        </div>
      </div>

      <div class="modal-footer">
        <button class="button button-cancel" @click="closeModal">취소</button>
        <button class="button button-create" @click="createTodo">생성</button>
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
  max-width: 600px; /* 이미지상 폭이 넓지 않으므로 최대 너비 지정 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 내용이 넘칠 경우 스크롤 처리 */
}

/* 모달 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #eee;
  background-color: #f7f7f7; /* 이미지 상의 살짝 회색 배경 */
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
  line-height: 1; /* x 버튼 세로 정렬 */
  transform: translateY(-2px); /* 약간 위로 올리기 */
}

.close-button:hover {
  color: #333;
}

/* 모달 본문 (폼) */
.modal-body {
  padding: 20px;
  overflow-y: auto; /* 내용이 길어지면 스크롤바 생성 */
  flex-grow: 1; /* 남은 공간 모두 차지 */
}

.form-row {
  display: flex;
  align-items: center; /* 라벨과 입력 필드 세로 중앙 정렬 */
  margin-bottom: 18px; /* 각 행의 아래 여백 */
}

.form-label {
  flex-basis: 120px; /* 라벨 고정 너비 */
  font-size: 15px;
  color: #555;
  margin-right: 15px;
  text-align: right; /* 라벨 우측 정렬 */
  flex-shrink: 0; /* 라벨 너비 고정 */
}

.form-input {
  flex-grow: 1; /* 남은 공간 모두 차지 */
  padding: 10px 7px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 15px;
  color: #333;
  outline: none;
}

.form-input::placeholder {
  color: #aaa;
}

.form-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* 라디오 버튼 그룹 */
.radio-group {
  display: flex;
  gap: 20px; /* 라디오 버튼 간 간격 */
  flex-grow: 1;
  align-items: center;
}

.radio-label {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #555;
  cursor: pointer;
}

.radio-input {
  margin-right: 8px;
  width: 18px; /* 라디오 버튼 크기 */
  height: 18px;
  cursor: pointer;
}

/* 날짜 입력 필드 아이콘 */
.input-with-icon {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.input-with-icon .form-input {
  flex-grow: 1;
}

.icon-calendar {
  font-size: 20px; /* 이모지 크기 */
  margin-left: 8px;
  margin-right: 15px;
  color: #666;
  cursor: pointer;
}

.date-input {
  width: 100%; /* 너비 조정 */
}

.ml-10 {
  margin-left: 10px; /* 등록일 옆 두번째 입력 필드용 마진 */
}

/* SR번호 자동 계산 텍스트 */
.read-only-text {
  flex-grow: 1;
  font-size: 15px;
  color: #888;
  background-color: #f8f8f8; /* 배경색으로 읽기 전용임을 시각적으로 표현 */
  padding: 10px 12px;
  border: 1px solid #eee;
  border-radius: 5px;
}

/* 공수시간 입력 필드 2개 */
.input-two-fields {
  display: flex;
  flex-grow: 1;
  gap: 10px; /* 두 필드 사이 간격 */
}

.input-two-fields .short-input {
  flex-basis: 120px; /* 적당한 고정 너비 */
  flex-shrink: 0;
}

.input-two-fields .long-input {
  flex-grow: 1; /* 나머지 공간 차지 */
}

/* 모달 푸터 */
.modal-footer {
  display: flex;
  justify-content: flex-end; /* 버튼들을 오른쪽으로 정렬 */
  padding: 20px 25px;
  border-top: 1px solid #eee;
  gap: 10px; /* 버튼 간 간격 */
  background-color: #f7f7f7;
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
  background-color: #007bff; /* 이미지 상의 파란색 버튼 */
  color: #fff;
}

.button-create:hover {
  background-color: #0056b3;
}

/* 미디어 쿼리 (모바일 반응형) */
@media (max-width: 768px) {
  .modal-container {
    max-width: 95%; /* 모바일에서 더 넓게 사용 */
    margin: 20px; /* 화면 가장자리에 붙지 않도록 여백 */
  }

  .form-row {
    flex-direction: column; /* 모바일에서 라벨과 입력 필드를 세로로 정렬 */
    align-items: flex-start; /* 왼쪽 정렬 */
  }

  .form-label {
    width: 100%; /* 라벨 전체 너비 */
    text-align: left; /* 라벨 왼쪽 정렬 */
    margin-bottom: 5px; /* 라벨 아래 여백 */
    margin-right: 0;
  }

  .form-input, .read-only-text {
    width: calc(100% - 24px); /* 패딩 고려한 너비 */
  }

  .radio-group {
    flex-direction: column; /* 라디오 버튼 세로 정렬 */
    align-items: flex-start;
    gap: 10px;
  }

  .input-with-icon, .input-two-fields {
    width: 100%;
    flex-wrap: wrap; /* 내용이 넘치면 줄바꿈 */
  }

  .input-two-fields .short-input,
  .input-two-fields .long-input {
    width: 100%; /* 모바일에서 두 입력 필드를 세로로 */
    flex-basis: auto; /* 고정 너비 해제 */
  }

  .icon-calendar {
    margin-left: 0; /* 모바일에서 아이콘 마진 조정 */
    margin-top: 5px;
  }
}
</style>