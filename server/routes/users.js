import express from 'express';
import db from '../db.js';

const router = express.Router();

// ユーザー一覧取得
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

export default router;