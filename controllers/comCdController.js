const pool = require('../pool'); 

exports.getComCdByGrpId = async (req, res) => {
    const grpId = req.params.grpId;

    if (!grpId) {
        return res.status(400).send({ message: '공통코드 그룹(grpId)이 필요합니다.' });
    }

    try {
        //  TODO. SORT 넣어줘야겠다!!!! ㅠ
        const [rows]  = await pool.query('SELECT CD_ID, CD_NM FROM COMCD WHERE CD_GRP_ID = ? ORDER BY CD_ID ASC', [grpId]); 
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send({ message: '공통코드 정보를 불러오는데 실패하였습니다.' });
    }
};
