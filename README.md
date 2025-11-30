# 正規表現チャレンジ

実践的な正規表現の問題を解いて、正規表現スキルを磨くことができる学習サービスです。

# Badge

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/70cdb1a815474bf0ad371b6d569e6763)](https://app.codacy.com/gh/ishi720/regex-challenge/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

# 技術スタック

## フロントエンド
- フレームワーク: React 19.x.x
- プログラミング言語: TypeScript 5.x.x
- ビルドツール: Vite 7.x.x
- スタイリング: Tailwind CSS 3.x.x

## バックエンド
- フレームワーク: Express 5.x.x
- DB: MySQL
- ドキュメント生成: Swagger

# プロジェクト構成

```
regex-challenge/
├── client/                # フロントエンド（React）
│   ├── public/            # 静的ファイル
│   ├── src/
│   │   ├── components/    # 再利用可能なコンポーネント
│   │   ├── pages/         # ページコンポーネント
│   │   ├── data/          # スタブデータ
│   │   ├── config.ts      # 設定ファイル
│   │   └── main.tsx       # エントリーポイント
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/                # バックエンド（Express）
│   ├── routes/            # APIルート
│   ├── db/                # データベース関連
│   │   ├── schema.sql    # テーブル定義
│   │   └── seed.sql      # サンプルデータ
│   ├── db.js             # DB接続設定
│   ├── index.js          # サーバーエントリーポイント
│   ├── swagger.js        # Swagger設定
│   └── package.json
└── README.md
```


# セットアップ手順

## 1. リポジトリのクローン
```bash
git clone https://github.com/ishi720/regex-challenge.git
cd regex-challenge
```

## 2. フロントエンドのセットアップ
```bash
cd client
npm install
```

## 3. バックエンドのセットアップ
```bash
cd server
npm install
```

### 環境変数の設定

```bash
cp .env.example .env
```

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=regex_challenge
```

## 4. DBの設定

```bash
# MySQLにログイン
mysql -u root -p

# データベース作成
CREATE DATABASE regex_challenge;
USE regex_challenge;

# テーブル作成
source db/schema.sql;

# サンプルデータ投入
source db/seed.sql;
```