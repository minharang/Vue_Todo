//서버시작 및 라우터 연결 역할
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

// 1. User 라우터 연결
const userRoutes = require('./routes/users'); 
app.use('/api/users', userRoutes); 

// 2. Todo 라우터 연결 (새로 추가)
const todoRoutes = require('./routes/todo'); 
app.use('/api/todos', todoRoutes); // '/api/todos' 요청은 todoRoutes가 처리

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});