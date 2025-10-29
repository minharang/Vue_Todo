const pool = require('../pool'); 

exports.getTodos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todoboard ORDER BY todo_id DESC');
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
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '조회 실패' });
  }
};

exports.createTodo = async (req, res) => {
  const {
    priority, startDt, dueDt, completionDate,
    requester, srno, requestTitle, requestContent, status, userId
  } = req.body;

  try {
    const sql = `INSERT INTO todoboard
      (priority, start_dt, due_dt, completed_dt, requester, srno, request_title, request_content, status, user_id)
      VALUES (?, COALESCE(NULLIF(?, ''), CURDATE()), ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      priority, startDt, dueDt, completionDate,
      requester, srno, requestTitle, requestContent, status, userId
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
    priority, startDt, dueDt, completionDate,
    requester, srno, requestTitle, requestContent, status, userId, todo_id
  } = req.body;

  try {
    const sql = `update todoboard
                    set priority = ? , start_dt = COALESCE(NULLIF(?, ''), CURDATE()) , due_dt = ? , completed_dt = ? 
                      , requester = ? , srno = ? , request_title = ? , request_content = ?
                      , status = ? , user_id = ?
                  where todo_id = ?`;
    const [result] = await pool.query(sql, [
      priority, startDt, dueDt, completionDate,
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