FROM node:20-alpine

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# アプリケーションのコピー
COPY . .

# ポートの公開
EXPOSE 3001

# アプリケーションの起動
CMD ["node", "index.js"]
