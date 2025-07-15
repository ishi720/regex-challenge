INSERT INTO `challenges` (
  `title`,
  `description`,
  `difficulty`,
  `sample_inputs`,
  `expected_outputs`,
  `created_at`,
  `updated_at`
) VALUES (
  '数字の削除する',
  '文字列に含まれる数字（0-9）を取り除いてください。',
  '初級',
  '["abc123xyz", "456def789"]',
  '["abcxyz", "def"]',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);