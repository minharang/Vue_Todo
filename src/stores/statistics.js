import { defineStore } from 'pinia'

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    statistics: [],
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
        this.statistics = data
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async getUserActualWorkingHours(user_id, year, month) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`http://localhost:3000/api/statistics/${user_id}/${year}/${month}`)
        if (!res.ok) {
          throw new Error('조회 실패')
        } else {
        const data = await res.json()
        this.statistics = data
        return data
      }
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },   
  },
})