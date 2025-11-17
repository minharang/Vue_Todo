//require('module-alias/register')  /* module-alias 설치: npm install module-alias / 설정: package.json _moduleAliases 참고 */
try { require('module-alias/register') } catch (e) { /* module-alias 없으면 무시 */ } /* module-alias 설치: npm install module-alias / 설정: package.json _moduleAliases 참고 */
const express = require('express')  /* 설치: npm install express cors / 실행: npm start 또는 node index.js */
const cors = require('cors')  /* 설치: npm install express cors */
// 삭제예정 : 20251029 src 외 controllers 라우팅 위한 주석 처리
//const todoModule = ('./routes/todo.js')
// import express from 'express'  /* 설치: npm install express cors / 실행: npm start 또는 node index.js */
// import cors from 'cors'  /* 설치: npm install express cors */
// import todoModule from './routes/todo.js'

let todoRoutes
let statisticsRoutes
try {
  // package.json _moduleAliases에 "@routes": "routes" 설정되어 있으면 사용
  todoRoutes = require('@routes/todo')
  statisticsRoutes = require('@routes/statistics')
} catch (err) {
  // alias가 없으면 상대경로로 fallback
  todoRoutes = require('./routes/todo')
  statisticsRoutes = require('./routes/statistics')
}
// 삭제예정 : 20251029 src 외 controllers 라우팅 위한 주석 처리
//const todoRoutes = todoModule?.default || todoModule // CommonJS/ESM 모두 대응

const app = express()
app.use(cors())
app.use(express.json())

/** todo routes 연결 추가
 * 클라이언트(웹)의 요청 URL이 /todos로 시작하면 todoRoutes(Express Router)에 위임
 * web에서 POST /todos 요청이 오면 Express는 todoRoutes 내부의 router.post('/') 핸들러를 실행하고, 
 * 그 핸들러에서 DB 쿼리(또는 컨트롤러 호출)를 수행, CRUD는 모두 routes/todo.js => controllers/todoController.js 에서 처리
 */
app.use('/todos', todoRoutes)

//const statisticsRoutes = require('./routes/statistics')
app.use('/api/statistics', statisticsRoutes)

/* 삭제예정 : 20251029 src 외 controllers 라우팅 위한 주석 처리
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
*/

app.listen(3000, () => console.log('API 서버 실행중: http://localhost:3000'))