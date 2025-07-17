export type Challenge = {
  id: number;
  challengeId: string;
  title: string;
  difficulty: '初級' | '中級' | '上級';
  description: string;
  sampleInputs: string[];
  expectedOutputs: string[][];
};

export const challenges: Challenge[] = [
  {
    id: 1,
    challengeId: '2d814586-631b-11f0-bed3-9c6b00411dbe',
    title: '数字のカンマ区切りを削除する',
    difficulty: '初級',
    description:
      '数値に含まれるカンマ（,）を取り除いて整形してください（例：1,000 → 1000）。',
    sampleInputs: [
      '売上: 1,000円、利益: 12,345円',
      '価格: 123,456円、税込: 1,000,000円',
    ],
    expectedOutputs: [
      ['売上: 1000円、利益: 12345円'],
      ['価格: 123456円、税込: 1000000円'],
    ],
  },
  {
    id: 2,
    challengeId: '2fe61651-5ece-2dbe-cd87-fd81a0b45afa',
    title: '氏名のスペースを削除する',
    difficulty: '初級',
    description:
      '氏名の姓と名の間にある半角スペースを削除してください（例：「田中 太郎」→「田中太郎」）。',
    sampleInputs: [
      '参加者一覧：田中 太郎、小林 花子',
      '出席者：佐藤 一郎、鈴木 次郎',
    ],
    expectedOutputs: [
      ['参加者一覧：田中太郎、小林花子'],
      ['出席者：佐藤一郎、鈴木次郎'],
    ],
  },
];