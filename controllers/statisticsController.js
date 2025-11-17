const pool = require('../pool'); 

exports.getStatistics = async (req, res) => {
  try {
    const [rows] = await pool.query(`select A.user_id
        , B.user_name 
        , A.year
        , A.month
        , A.date
        , (select cd_nm from comcd where cd_grp_id = 'S002' and cd_id = A.type_id ) cd_nm
        , A.calculate_hour_sum
        , A.man_hour_sum
        , DATE_FORMAT(A.created_dt, '%Y-%m-%d %H:%i:%s') AS created_dt
        , DATE_FORMAT(A.updated_dt, '%Y-%m-%d %H:%i:%s') AS updated_dt
        from usersworksheet A
        left join users B on a.user_id = B.user_id 
        order by A.user_id, A.created_dt DESC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '통계 목록 조회 실패' });
  }
};
