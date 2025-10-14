const pool = require('../pool'); 

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mingji'); 
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: '사용자 데이터를 불러오는 데 실패했습니다.' });
    }
};

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO mingji (seq, hello) VALUES (?, ?)', [seq, hello]);
        res.status(201).json({ 
            message: '사용자 생성 성공', 
            hello: result.hello 
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send({ message: '사용자 생성에 실패했습니다.' });
    }
};