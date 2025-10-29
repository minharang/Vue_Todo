//서버시작 및 라우터 연결 역할
require('module-alias/register');
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

const userRoutes = require('@routes/users'); 
app.use('/api/users', userRoutes); 

const todoRoutes = require('@routes/todo'); 
app.use('/todos', todoRoutes); 

const comcd = require('@routes/comcd');
app.use('/api/comcd', comcd); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});