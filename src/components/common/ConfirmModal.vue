<script setup>
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
let resolvePromise; // Promise의 resolve 함수를 저장할 변수

// 모달을 열고 Promise를 반환하는 함수
const open = (msg) => {
    message.value = msg;
    isVisible.value = true;
    
    // Promise를 반환하고, resolve 함수를 저장
    return new Promise((resolve) => {
        resolvePromise = resolve;
    });
};

// '확인' 또는 '취소' 버튼 클릭 시 응답 처리
const handleResponse = (result) => {
    isVisible.value = false;
    // 저장된 resolve 함수를 호출하여 Promise를 해결 (true 또는 false 반환)
    if (resolvePromise) {
        resolvePromise(result);
    }
};

// 부모 컴포넌트에서 open 함수를 호출할 수 있도록 노출
defineExpose({
    open
});
</script>

<template>
    <div v-show="isVisible" class="modal-overlay">
        <div class="confirm-modal">
            <p>{{ message }}</p>
            <div class="actions">
                <button @click="handleResponse(true)" class="btn-confirm">확인</button>
                <button @click="handleResponse(false)" class="btn-cancel">취소</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 간단한 모달 스타일 */
.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex;
    justify-content: center; align-items: center; z-index: 10000;
}
.confirm-modal {
    background: white; padding: 20px; border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); min-width: 300px;
    text-align: center;
}
.actions button { margin: 0 10px; padding: 8px 15px; cursor: pointer; }
</style>