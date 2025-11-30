FROM node:20-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# アプリケーションのコピー
COPY . .

# ポートの公開
EXPOSE 5173

# 開発サーバーの起動（ホストを0.0.0.0に設定してDockerからアクセス可能に）
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
