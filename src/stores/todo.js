import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async createTodo(newTodo) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTodo),
        })
        if (!res.ok) throw new Error('등록 실패')
        const data = await res.json()
        this.todos.unshift(data)
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async updateTodo(updatedTodo) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`http://localhost:3000/todos/${updatedTodo.todo_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTodo),
        })
        if (!res.ok) throw new Error('수정 실패')
        const data = await res.json()
        // 기존 todos 배열에서 해당 항목을 찾아 교체
        const idx = this.todos.findIndex(t => t.todo_id === updatedTodo.todo_id)
        if (idx !== -1) this.todos[idx] = data
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async deleteTodo(todo_id) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(`http://localhost:3000/todos/${todo_id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('삭제 실패')
        // 삭제 성공 시 todos 배열에서 제거
        this.todos = this.todos.filter(t => t.todo_id !== todo_id)
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/todos')
        if (!res.ok) throw new Error('조회 실패')
        const data = await res.json()
        this.todos = data
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})