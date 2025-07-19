<script setup>
defineProps({
  color: { type: String, default: '##34495e'},
  size: { type: String, default: '50px' }
})
</script>
<template>
<div class="hloader" :style="`--hloader-color: ${color}; --hloader-size: ${size};`">
  <svg viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715">
    <circle cx="45.714285714285715" cy="45.714285714285715" r="20" stroke-width="5.714285714285714" stroke-dasharray="125.664" stroke-dashoffset="125.66370614359172px"></circle>
  </svg>
</div>
</template>
<style scoped>
body {
  padding: 20px;
  background-color: #061332d8;
}

.hloader {
  /* --hloader-color: #e96900;
  --hloader-size: 100px; */
  --hloader-weight: 4;
  --hloader-duration: 1.5s;
  width: var(--hloader-size);
  height: var(--hloader-size);
  color: var(--hloader-color);
    box-sizing: border-box;
}
.hloader svg {
  animation: hloader-svg var(--hloader-duration) linear infinite;
}
.hloader circle {
  animation: hloader-circle var(--hloader-duration) linear infinite;
  fill: transparent;
  stroke-width: var(--hloader-weight);
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0px;
  stroke: currentColor;
}
@keyframes hloader-svg {
  100% { transform: rotate(1turn); }
}
@keyframes hloader-circle { 
  0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0px; } 
  50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15px; } 
  100% { stroke-dasharray: 100, 200; stroke-dashoffset: -124px; }
}
</style>