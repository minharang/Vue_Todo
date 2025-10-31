import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
  state: () => ({
    lastError: null
  }),
  actions: {
    setError(err) { this.lastError = err },
    clearError() { this.lastError = null }
  }
})