const pool = require('../pool'); 

exports.login = async (req, res) => {
    const { userId, password } = req.body; 

    if (!userId || !password) {
        return res.status(400).send({ message: '아이디와 비밀번호를 모두 입력해야 합니다.' });
    }

    try {
        const [rows] = await pool.query('SELECT USER_ID AS userId, USER_NAME AS userName FROM USERS WHERE USER_ID = ? AND PASSWORD = ?', [userId, password]); 

        if (rows.length === 0) {
            return res.status(401).send({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }
        req.session.userId = rows[0].userId; 
        req.session.userName = rows[0].userName; 

        res.status(200).json({ 
            success: true, 
            message: '로그인에 성공했습니다.', 
            userId: rows[0].userId,
            userName: rows[0].userName
        });
        
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send({ message: '서버 오류로 로그인에 실패하였습니다.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send({ message: '로그아웃 처리 중 오류가 발생했습니다.' });
        }
        res.status(200).send({ message: '로그아웃되었습니다.' });
    });
};