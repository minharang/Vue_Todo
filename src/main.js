import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'  /* 설치: npm i pinia */

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
//createApp(App).use(router).mount('#app')