//서버시작 및 라우터 연결 역할
require('module-alias/register');
const express = require('express');
const cors = require('cors'); 
const session = require('express-session');
const app = express();
const PORT = 3000; 

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,            
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(session({
    secret:  'study-pmds-srtodo-key-1357', 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,  // 24시간 세션 유지
        httpOnly: true, 
        secure: false, 
    } 
}));

const auth = require('@routes/auth');
app.use('/auth', auth);     

const userRoutes = require('@routes/users'); 
app.use('/users', userRoutes); 

const todoRoutes = require('@routes/todo'); 
app.use('/todos', todoRoutes); 

const comcd = require('@routes/com');
app.use('/api/com', comcd); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});