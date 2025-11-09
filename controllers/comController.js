const pool = require('../pool'); 

exports.getCurrentUser = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(400).send({ message: '인증되지 않은 사용자입니다.' });
    }
    try {
        const [rows]  = await pool.query('SELECT USER_ID, USER_NAME FROM USERS WHERE USER_ID = ?', [userId]); 
        if (rows.length === 0) {
            return res.status(404).send({ message: '사용자 정보를 찾을 수 없습니다.' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching user info from DB:', err);
        res.status(500).send({ message: '사용자 정보를 불러오는데 실패하였습니다.' });
    }
};

exports.getComCdByGrpId = async (req, res) => {
    const grpId = req.params.grpId;

    if (!grpId) {
        return res.status(400).send({ message: '공통코드 그룹(grpId)이 필요합니다.' });
    }

    try {
        const [rows]  = await pool.query('SELECT CD_ID, CD_NM FROM COMCD WHERE CD_GRP_ID = ? ORDER BY SEQ ASC', [grpId]); 
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: '공통코드 정보를 불러오는데 실패하였습니다.' });
    }
};
