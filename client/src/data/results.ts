export type Result = {
  id: number; // ID
  userId: string; // ユーザーID（UUID）
  challengeId: string; // チャレンジID（UUID）
  regex: string; // 正規表現
  replacement: string; // 置換文字列
  isCorrect: boolean; // 正誤判定（true: 正解, false: 不正解）
  createdAt: string; // 作成日時
};

export const results: Result[] = [
  {
    id: 1,
    userId: '65757ac7-1fae-4a6e-c82d-b912c5c67ed8',
    challengeId: '2d814586-631b-11f0-bed3-9c6b00411dbe',
    regex: ',',
    replacement: '',
    isCorrect: true,
    createdAt: '2023-10-05T15:00:00Z',
  },
  {
    id: 2,
    userId: 'aa0512e6-6d30-6036-9988-f1e6eacf3383',
    challengeId: '2fe61651-5ece-2dbe-cd87-fd81a0b45afa',
    regex: new RegExp(',(?=\\d{3})').source,
    replacement: '',
    isCorrect: true,
    createdAt: '2023-10-06T09:30:00Z',
  },
];