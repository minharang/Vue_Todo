<script setup>
// 필요한 경우, 메뉴 활성화 상태 관리
</script>

<template>
  <aside class="the-sidebar">
    <nav class="sidebar-nav">
      <a href="#" class="sidebar-item active">홈</a>
      <a href="#" class="sidebar-item">SR관리</a>
      <a href="#" class="sidebar-item">통계관리</a>
      <a href="#" class="sidebar-item">사용자관리</a>
    </nav>
  </aside>
</template>

<style scoped>
.the-sidebar {
  width: 250px; /* 사이드바 너비 */
  background-color: #2c3e50; /* 이미지 상의 더 어두운 남색 배경 */
  padding-top: 30px; /* 상단 여백 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* 너비가 줄어들지 않도록 고정 */
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  color: #c0c0c0;
  text-decoration: none;
  padding: 15px 30px; /* 상하좌우 여백 */
  font-size: 17px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-left: 5px solid transparent; /* 활성화 표시를 위한 투명 보더 */
}

.sidebar-item:hover {
  background-color: #3a5068; /* 호버 시 배경색 */
  color: #fff;
}

.sidebar-item.active {
  background-color: #34495e; /* 활성화 시 배경색 */
  color: #fff;
  font-weight: bold;
  border-left-color: #007bff; /* 활성화 시 파란색 왼쪽 보더 */
}

/* 모바일 반응형 (사이드바) */
@media (max-width: 768px) {
  .the-sidebar {
    display: none; /* 모바일에서는 사이드바 숨김 (햄버거 메뉴 등으로 대체) */
  }
}
</style>