import express from 'express';
import db from '../db.js';

const router = express.Router();

/**
 * @swagger
 * /api/challenges:
 *   get:
 *     summary: チャレンジ一覧を取得
 *     tags:
 *       - Challenges
 *     responses:
 *       200:
 *         description: チャレンジの配列
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Challenge'
 *       500:
 *         description: DB接続エラー
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

/**
 * @swagger
 * /api/challenges/{challengeId}:
 *   get:
 *     summary: チャレンジIDを指定して取得
 *     tags:
 *       - Challenges
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Challenge'
 *       404:
 *         description: チャレンジが見つかりません
 *       500:
 *         description: DB接続エラー
 */
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