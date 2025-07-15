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

// チャレンジID指定で単体取得
router.get('/:id', async (req, res) => {
  const challengeId = req.params.id;

  try {
    const [rows] = await db.query('SELECT * FROM challenges WHERE id = ?', [challengeId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'チャレンジが見つかりません' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

export default router;