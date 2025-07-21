export type Result = {
  id: number;
  userId: string;
  challengeId: string;
  regex: string;
  replacement: string;
  isCorrect: boolean;
  createdAt: string;
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