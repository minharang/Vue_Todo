const pool = require('../pool'); 

exports.getStatistics = async (req, res) => {
  try {
    const [rows] = await pool.query(`select A.user_id
        , B.user_name 
        , A.year
        , A.month
        , A.date
        , (select cd_nm from comcd where cd_grp_id = 'S002' and cd_id = A.system_id ) cd_nm
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

exports.getUserActualWorkingHours = async (req, res) => {
  try {
    const [rows] = await pool.query(`
 WITH baseTable AS (
        select A.user_id
                , A.\`year\` 
                , A.\`month\` 
                , A.\`date\` 
                , sum(A.man_hour_sum) as man_hour_sum
                from usersworksheet A
          group by A.user_id , A.\`year\` , A.\`month\` , A.\`date\`   
   ),
 monthlyWorkInfo as (
    select * from monthlytask
 ),
 holidayInfo as (
    select T1.user_id , T1.\`year\` , T1.\`month\`, sum(T1.holiday_hour) as holiday_hour_sum
      from (	select m.*,
              (select cd_nm from comcd where cd_grp_id = 'S004' and cd_id = m.holiday_id) as holiday_hour
              from myholidaymng m 
              where m.user_id = ?
              and m.\`year\` = ?
              and m.\`month\` = ?
    ) T1 group by T1.user_id, T1.\`year\`, T1.\`month\`
)
 SELECT
	baseTable.user_id
  , man_hour_sum
  , monthlyWorkInfo.net_work_hours
  , monthlyWorkInfo.std_work_hour
  , holidayInfo.holiday_hour_sum  
 FROM baseTable
  LEFT JOIN monthlyWorkInfo ON baseTable.\`year\`  = monthlyWorkInfo.\`year\`  and baseTable.\`month\`  = monthlyWorkInfo.\`month\` 
  LEFT JOIN holidayInfo ON baseTable.user_id = holidayInfo.user_id and baseTable.\`year\` = holidayInfo.\`year\` 
         	and baseTable.\`month\` = holidayInfo.\`month\` 
 WHERE baseTable.user_id = ?`, [req.params.user_id, req.params.year, req.params.month, req.params.user_id]);
    console.log('[Executing Query]',rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '사용자 월별 근무 정보 조회 실패' });
  }
};
