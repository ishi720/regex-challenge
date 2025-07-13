import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { challenges } from '../data/challenges';

const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const challengeId = Number(id);

  const challenge = challenges.find((c) => c.id === challengeId);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        {challenge ? (
          <>
            <h1>{challenge.title}</h1>
            <p><strong>難易度:</strong> {challenge.difficulty}</p>
            <p>ここに問題の説明や入力欄、正規表現チェックなどを表示します。</p>
          </>
        ) : (
          <p>該当するチャレンジが見つかりませんでした。</p>
        )}
      </div>
    </>
  );
};

export default ChallengePage;