import React from 'react';
import Header from '../components/Header';

const ResultPage: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1>結果ページ</h1>
        <p>ここに、チャレンジ結果や正解・不正解の判定などを表示します（仮）。</p>
      </div>
    </>
  );
};

export default ResultPage;