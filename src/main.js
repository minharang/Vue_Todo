import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'  /* 설치: npm i pinia */
import { useErrorStore } from '@/stores/errorStore'

const app = createApp(App)
const pinia = createPinia()

//createApp(App).use(router).use(pinia).mount('#app')
//createApp(App).use(router).use(pinia)
app.use(router)
app.use(pinia)

// Vue 전역 에러 핸들러
app.config.errorHandler = (err, vm, info) => {
  console.error('Global Vue error:', err, info)
  try {
    const store = useErrorStore()
    store.setError({ message: err?.message || 'Unknown Vue error', info })
  } catch (e) {
    console.error('errorStore not available yet:', e)
  }
}

// 전역 비동기 에러 포착
window.addEventListener('unhandledrejection', (ev) => {
  console.error('Unhandled rejection:', ev.reason)
  try {
    const store = useErrorStore()
    store.setError({ message: ev.reason?.message || String(ev.reason) })
  } catch (e) {
    console.error('errorStore not available yet:', e)
  }
})
window.addEventListener('error', (ev) => {
  console.error('Window error:', ev.error || ev.message)
  try {
    const store = useErrorStore()
    store.setError({ message: ev.error?.message || ev.message })
  } catch (e) {
    console.error('errorStore not available yet:', e)
  }
})

app.mount('#app')
//createApp(App).use(router).mount('#app')