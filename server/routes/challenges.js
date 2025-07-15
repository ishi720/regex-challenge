import express from 'express';
import db from '../db.js';

const router = express.Router();

// チャレンジ一覧取得
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM challenges');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

export default router;