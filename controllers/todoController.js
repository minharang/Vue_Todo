const pool = require('../pool'); 

exports.getTodos = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT a.todo_id, a.request_title
       , a.request_content, a.user_id, a.status
       , ( select cd_nm from comcd where cd_grp_id = 'S001' and cd_id = a.status LIMIT 1 ) as status_nm
       , a.requester, a.type_id, a.del_yn, a.except_yn, a.priority
       , a.srno, a.note, a.note2
       , DATE_FORMAT(a.start_dt, '%Y-%m-%d') AS start_dt
       , a.man_hour, a.calculate_hour
       , DATE_FORMAT(a.created_dt, '%Y-%m-%d') AS created_dt
       , a.create_id
       , DATE_FORMAT(a.updated_dt, '%Y-%m-%d') AS updated_dt
       , a.update_id
       , DATE_FORMAT(a.completed_dt, '%Y-%m-%d') AS completed_dt
       , DATE_FORMAT(a.due_dt, '%Y-%m-%d') AS due_dt
       , (select user_name from users where user_id = a.user_id) as user_name
       FROM todoboard a ORDER BY a.todo_id DESC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '할 일 목록 조회 실패' });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todoboard WHERE todo_id = ?', [req.params.todo_id]);
    if (!rows.length) return res.status(404).json({ message: '할 일 없음' });
    console.log('[Executing Query]',rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '조회 실패' });
  }
};

exports.createTodo = async (req, res) => {
  const {
    priority, startDt, dueDt, completionDate,
    requester, srno, requestTitle, requestContent, userId
  } = req.body;

  try {
    const sql = `INSERT INTO todoboard
      (priority, start_dt, due_dt, completed_dt, requester, srno, request_title
      , request_content, user_id, create_id)
      VALUES (?, COALESCE(NULLIF(?, ''), CURDATE()), ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      priority, startDt, dueDt, completionDate,
      requester, srno, requestTitle, requestContent, userId, userId
    ]);

    const [rows] = await pool.query('SELECT * FROM todoboard WHERE todo_id = ?', [result.todo_id]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '생성 실패' });
  }
};

exports.updateTodo = async (req, res) => {
  const {
    priority, startDt, dueDt,
    requester, srno, requestTitle, requestContent, status, userId, todo_id
  } = req.body;

  try {
    const sql = `update todoboard
                    set priority = ? , start_dt = COALESCE(NULLIF(?, ''), CURDATE()) , due_dt = ? 
                    , completed_dt = case when ? = '9999' then CURDATE() else null end
                    , requester = ? , srno = ? , request_title = ? , request_content = ?
                    , status = ? , update_id = ?
                  where todo_id = ?`;
    const [result] = await pool.query(sql, [
      priority, startDt, dueDt, status,
      requester, srno, requestTitle, requestContent, status, userId, todo_id
    ]);
    const [rows] = await pool.query('SELECT * FROM todoboard WHERE todo_id = ?', [todo_id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '수정 실패' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await pool.query('DELETE FROM todoboard WHERE todo_id = ?', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '삭제 실패' });
  }
};