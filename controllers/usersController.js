const pool = require('../pool'); 

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users'); 
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: '사용자 데이터를 불러오는 데 실패했습니다.' });
    }
};

exports.createUser = async (req, res) => {
    try {
         console.log('Request Body:', req.body); // 들어오는 값 확인
        const { user_id, user_name, email, password } = req.body;
        const [result] = await pool.query('INSERT INTO users (user_id, user_name, email, password) VALUES (?, ?, ?, ?)', [user_id, user_name, email, password]);
        const newUser = {
            userId :user_id,
            userName : user_name,
            email,
            password
        };
        console.log('INSERT RESULT:', result);
        res.status(201).json(newUser); 
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send({ message: '사용자 생성에 실패했습니다.' });
    }
};