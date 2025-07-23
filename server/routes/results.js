import express from 'express';
import db from '../db.js';

const router = express.Router();

/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: 回答結果一覧を取得
 *     tags:
 *       - Results
 *     responses:
 *       200:
 *         description: 回答結果一覧
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       500:
 *         description: DB接続エラー
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM results');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

/**
 * @swagger
 * /api/results/{challenge_id}:
 *   get:
 *     summary: 指定チャレンジIDの回答結果を取得
 *     tags:
 *       - Results
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         schema:
 *           type: string
 *         required: true
 *         description: チャレンジID
 *     responses:
 *       200:
 *         description: 回答結果
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       500:
 *         description: DB接続エラー
 */
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

/**
 * @swagger
 * /api/results:
 *   post:
 *     summary: 新しい回答結果を登録
 *     tags:
 *       - Results
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               challengeId:
 *                 type: string
 *               regex:
 *                 type: string
 *               replacement:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 回答結果が作成されました
 *       500:
 *         description: DB接続エラー
 */
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