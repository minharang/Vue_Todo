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
      (todo_id, start_dt, due_dt, completed_dt, requester, srno, request_title, request_content, status, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      priority, startDt, dueDt, completionDate,
      requester, srno, requestTitle, requestContent, status, userId
    ]);

    const [rows] = await pool.query('SELECT * FROM todoboard WHERE todo_id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '생성 실패' });
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const fields = [];
    const values = [];
    Object.keys(updates).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    });
    if (fields.length === 0) return res.status(400).json({ message: '업데이트할 데이터 없음' });
    values.push(id);
    const sql = `UPDATE todoboard SET ${fields.join(', ')} WHERE todo_id = ?`;
    await pool.query(sql, values);
    const [rows] = await pool.query('SELECT * FROM todoboard WHERE todo_id = ?', [id]);
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