import { defineStore } from 'pinia'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

export const useUserStore = defineStore('user', {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
  }),

  actions: {    
    async getAllUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`${API_BASE_URL}/users`)
        this.todos = res.data       // axios는 이미 JSON 파싱됨
        return res.data
      } catch (e) {
        this.error = e
        console.error('유저 조회 실패:', e)
      } finally {
        this.loading = false
      }
    },
    async createUser(payload) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post(`${API_BASE_URL}/users`, payload);
        console.log('POST RESULT:', res.data);
        this.todos.unshift(res.data);
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})