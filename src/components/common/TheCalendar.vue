<script setup>
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['date-selected']);

const currentMonth = ref(new Date());

/**
 * 주어진 날짜가 포함된 달의 첫 번째 날 (1일)을 반환합니다.
 * @param {Date} date - 기준 날짜
 * @returns {Date} 해당 월의 1일 날짜 객체
 */
const getStartOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * 주어진 달이 며칠까지 있는지 (28, 29, 30, 31) 반환합니다.
 * @param {Date} date - 기준 날짜
 * @returns {number} 해당 월의 마지막 날짜
 */
const getDaysInMonth = (date) => {
    // 다음 달 0일은 이번 달의 마지막 날입니다.
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * 달력 표시를 위한 날짜 배열을 계산합니다.
 */
const calendarDays = computed(() => {
    const today = new Date();
    const startOfMonth = getStartOfMonth(currentMonth.value);
    const daysInMonth = getDaysInMonth(currentMonth.value);
    
    // 해당 월의 1일이 무슨 요일인지 (0=일요일, 1=월요일, ...)
    const firstDayOfWeek = startOfMonth.getDay();
    
    const days = [];

    // 이전 달의 빈 칸 채우기 (요일 맞추기)
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push({ date: null, isCurrentMonth: false });
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), i);
        days.push({
            date: date,
            day: i,
            isCurrentMonth: true,
            isToday: date.toDateString() === today.toDateString()
        });
    }

    // 전체 날짜 배열이 7의 배수가 되도록 남은 빈 칸 채우기 (선택 사항)
    // 현재는 생략하고 렌더링에서 flex-wrap으로 처리합니다.

    return days;
});

/**
 * 이전 달로 이동합니다.
 */
const prevMonth = () => {
    currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1);
};

/**
 * 다음 달로 이동합니다.
 */
const nextMonth = () => {
    currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1);
};

/**
 * 날짜를 선택했을 때 부모 컴포넌트에 이벤트를 발생시킵니다.
 * @param {Date} date - 선택된 날짜
 */
const selectDate = (date) => {
    if (date) {
        emit('date-selected', date.toISOString().split('T')[0]); // YYYY-MM-DD 형식으로 전달
    }
};

// 표시될 요일 이름 (일요일 시작 기준)
const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

// 표시될 월 이름
const monthName = computed(() => {
    return currentMonth.value.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
});
</script>

<template>
    <div class="calendar-container">
        <!-- 헤더: 월 이동 버튼 및 월/년도 표시 -->
        <div class="calendar-header">
            <button @click="prevMonth" class="nav-button">&lt;</button>
            <div class="month-name">{{ monthName }}</div>
            <button @click="nextMonth" class="nav-button">&gt;</button>
        </div>

        <!-- 요일 표시 -->
        <div class="calendar-days-header">
            <span v-for="day in dayNames" :key="day" class="day-name">{{ day }}</span>
        </div>

        <!-- 날짜 표시 -->
        <div class="calendar-grid">
            <div 
                v-for="(day, index) in calendarDays" 
                :key="index"
                :class="[
                    'day-cell', 
                    { 
                        'is-current-month': day.isCurrentMonth, 
                        'is-today': day.isToday,
                        'is-selectable': day.date
                    }
                ]"
                @click="selectDate(day.date)"
            >
                {{ day.day }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.calendar-container {
    max-width: 320px;
    /*margin: 20px auto;*/
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    font-family: 'Inter', sans-serif;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.month-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
}

.nav-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #007bff;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.1s;
}

.nav-button:hover {
    background-color: #f0f8ff;
}

.calendar-days-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 0.85rem;
    color: #666;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.day-cell {
    padding: 8px 0;
    text-align: center;
    font-size: 0.9rem;
    border-radius: 4px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.1s;
}

.day-cell.is-current-month {
    color: #333;
}

.day-cell:not(.is-current-month) {
    color: #ccc;
    cursor: default;
}

.day-cell.is-selectable:hover {
    background-color: #e0f0ff;
    cursor: pointer;
}

.day-cell.is-today {
    background-color: #007bff;
    color: #fff !important;
    font-weight: 700;
}

.day-cell.is-today:hover {
    background-color: #0056b3;
}

/* 일요일과 토요일 색상 */
.day-name:first-child, .day-cell:nth-child(7n+1) {
    color: #d9534f; /* 일요일 (빨간색) */
}
.day-name:last-child, .day-cell:nth-child(7n) {
    color: #5bc0de; /* 토요일 (파란색) */
}
</style>