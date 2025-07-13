export type Challenge = {
  id: number;
  title: string;
  difficulty: '初級' | '中級' | '上級';
};

export const challenges: Challenge[] = [
  { id: 1, title: 'URLを抽出する正規表現', difficulty: '初級' },
  { id: 2, title: '日付形式のバリデーション', difficulty: '中級' },
  { id: 3, title: 'メールアドレスの検出', difficulty: '上級' },
];
