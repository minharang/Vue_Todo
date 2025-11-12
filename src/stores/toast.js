import { ref, readonly } from 'vue';

// 토스트 배열 (전역 상태)
const toasts = ref([]);
let id = 0;

/**
 * 새 토스트 알림을 추가합니다.
 * @param {string} message - 토스트에 표시할 메시지
 * @param {string} type - 토스트 유형 (예: 'success', 'error', 'info')
 * @param {number} duration - 표시 시간 (ms)
 */
const addToast = (message, type = 'info', duration = 3000) => {
  const newToast = { id: id++, message, type };
  toasts.value.push(newToast);

  // 지정된 시간 후 토스트 자동 제거
  setTimeout(() => {
    removeToast(newToast.id);
  }, duration);
};

// 특정 ID를 가진 토스트를 제거합니다.
const removeToast = (toastId) => {
  toasts.value = toasts.value.filter(t => t.id !== toastId);
};

// 다른 컴포넌트에서 사용할 수 있도록 노출합니다.
export function useToast() {
  return {
    toasts: readonly(toasts), // 외부에서는 읽기 전용으로만 접근
    addToast,
    removeToast,
  };
}