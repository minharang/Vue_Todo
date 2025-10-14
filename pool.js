require('dotenv').config(); 
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); 

// 🔑 이 pool 객체를 다른 파일(API 라우터)에서 사용할 수 있도록 내보냅니다.
module.exports = pool;