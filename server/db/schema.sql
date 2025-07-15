-- チャレンジテーブル
CREATE TABLE IF NOT EXISTS challenges (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'チャレンジID',
  title VARCHAR(255) NOT NULL COMMENT 'タイトル',
  description TEXT NOT NULL COMMENT '問題文の説明',
  difficulty ENUM('初級', '中級', '上級') NOT NULL COMMENT '難易度',
  sample_inputs JSON NOT NULL COMMENT 'サンプル入力（JSON配列）',
  expected_outputs JSON NOT NULL COMMENT '期待される出力（JSON配列）',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) COMMENT='チャレンジテーブル';

-- 回答結果テーブル
CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '回答結果ID',
  user_id VARCHAR(64) NOT NULL COMMENT 'ユーザーID（UUID）',
  challenge_id INT NOT NULL COMMENT 'チャレンジID',
  regex TEXT NOT NULL COMMENT '正規表現',
  replacement TEXT NOT NULL COMMENT '置換文字列',
  is_correct BOOLEAN NOT NULL COMMENT '正誤判定',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '提出日時'
) COMMENT='回答結果一覧テーブル';