import React from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { results } from '../data/results';

const ResultPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();

  // 対象の結果だけ抽出
  const filteredResults = results.filter(
    (result) => result.challengeId === challengeId
  );

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>結果ページ</h1>
        <p>チャレンジID「{challengeId}」に対する提出一覧：</p>

        {filteredResults.length > 0 ? (
          <table style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>ユーザーID</th>
                <th style={thStyle}>正規表現</th>
                <th style={thStyle}>置換文字列</th>
                <th style={thStyle}>正誤</th>
                <th style={thStyle}>提出日時</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id}>
                  <td style={tdStyle}>{result.userId}</td>
                  <td style={tdStyle}>{result.regex}</td>
                  <td style={tdStyle}>{result.replacement}</td>
                  <td style={tdStyle}>{result.isCorrect ? '○' : '×'}</td>
                  <td style={tdStyle}>{new Date(result.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: '1rem' }}>まだ結果はありません。</p>
        )}
      </div>
    </>
  );
};

const thStyle: React.CSSProperties = {
  borderBottom: '2px solid #ccc',
  textAlign: 'left',
  padding: '0.5rem',
};

const tdStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '0.5rem',
};

export default ResultPage;
