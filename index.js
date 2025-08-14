import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let todos = []
let id = 1

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const todo = { ...req.body, id: id++ }
  todos.push(todo)
  console.log(todos)
  res.status(201).json(todo)
})

app.put('/todos/:id', (req, res) => {
  const idx = todos.findIndex(t => t.id == req.params.id)
  if (idx === -1) return res.status(404).end()
  todos[idx] = { ...todos[idx], ...req.body }
  console.log(todos)
  res.json(todos[idx])
})

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id)
  console.log(todos)
  res.status(204).end()
})

app.listen(3000, () => console.log('API 서버 실행중: http://localhost:3000'))