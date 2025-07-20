import express from 'express';
import db from '../db.js';

const router = express.Router();

// 回答結果一覧取得
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM results');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

// チャレンジID指定で単体取得
router.get('/:id', async (req, res) => {
  const challengeId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM results WHERE challenge_id = ?', [challengeId]);

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

// 新しい結果を登録
router.post('/', async (req, res) => {
  const { userId, challengeId, regex, replacement, isCorrect } = req.body;

  if (!userId || !challengeId || regex === undefined || replacement === undefined || isCorrect === undefined) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO results (user_id, challenge_id, regex, replacement, is_correct, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, challengeId, regex, replacement, isCorrect]
    );

    res.status(201).json({ message: 'Result created', resultId: result.insertId });
  } catch (error) {
    console.error('Error inserting result:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;