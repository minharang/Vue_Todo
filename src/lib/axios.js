import axios from 'axios'  // 설치: npm i axios
import router from '@/routes' // 라우터 사용(401 리다이렉트 등)
import { useErrorStore } from '@/stores/errorStore'

const api = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE || '/api',
  timeout: 10000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, err => Promise.reject(err))

api.interceptors.response.use(res => res, err => {
  const errorStore = useErrorStore()
  const status = err?.response?.status

  // 전역 에러 저장
  errorStore.setError({
    message: err?.response?.data?.message || err.message,
    status
  })

  // 인증 관련 시 홈(로그인)으로 리다이렉트
  if (status === 401) {
    router.push('/Home').catch(()=>{})
  }

  console.error('API Error:', status, err?.message)
  return Promise.reject(err)
})

export default api