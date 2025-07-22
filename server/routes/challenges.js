import express from 'express';
import db from '../db.js';

const router = express.Router();

/**
 * @swagger
 * /api/challenges/{challengeId}:
 *   get:
 *     summary: チャレンジIDを指定して取得
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         schema:
 *           type: string
 *         required: true
 *         description: チャレンジのID
 *     responses:
 *       200:
 *         description: チャレンジ情報
 *       404:
 *         description: チャレンジが見つかりません
 */
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
router.get('/:challengeId', async (req, res) => {
  const challengeId = req.params.challengeId;

  try {
    const [rows] = await db.query(
      'SELECT * FROM challenges WHERE challenge_id = ?',
      [challengeId]
    );

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