import { defineStore } from 'pinia'

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchStatisticsMng() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/api/statistics')
        if (!res.ok) throw new Error('조회 실패')
        const data = await res.json()
        this.todos = data
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    } 
  },
})