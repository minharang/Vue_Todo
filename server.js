require('module-alias/register');
const express = require('express');
const cors = require('cors'); 
const session = require('express-session');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
const PORT = 3000; 

// 0. CORS / JSON / SESSION
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'study-pmds-srtodo-key-1357',
    resave: false,
    saveUninitialized: false
}));


// 1. API 라우터는 반드시 history *위에*
app.use('/auth', require('@routes/auth'));
app.use('/api/users', require('@routes/users'));
app.use('/todos', require('@routes/todo'));
app.use('/api/com', require('@routes/com'));

app.use('/api/statistics', require('./routes/statistics'));
app.use('/api/statistics', (req, res, next) => {
  console.log('📥 [API 호출 진입]:', req.method, req.originalUrl);
  next();
});
// 2. history fallback — rewrites 옵션 제거
app.use(history());     // ← 이렇게만 해야 API가 안 가로채짐

// 3. 정적 파일 서빙은 history *아래*
app.use(express.static(path.join(__dirname, 'dist')));

// 4. 서버 시작
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
