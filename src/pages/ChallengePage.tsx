import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { challenges } from '../data/challenges';

const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const challengeId = Number(id);
  const challenge = challenges.find((c) => c.id === challengeId);

  // 入力欄の状態管理
  const [regexInput, setRegexInput] = useState('');
  const [replaceInput, setReplaceInput] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  // テスト対象の文字列（本来は問題データと紐付け）
  const sampleText = 'abc123xyz';

  // 「テスト」ボタンの処理
  const handleTest = () => {
    try {
      const regex = new RegExp(regexInput, 'g');
      const result = sampleText.replace(regex, replaceInput);
      setTestResult(result);
    } catch (error) {
      setTestResult(`正規表現の構文エラーです: ${error}`);
    }
  };

  // 「回答」ボタンの処理（仮）
  const handleSubmit = () => {
    alert('回答を送信しました。');
  };

  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        {challenge ? (
          <>
            <h1>{challenge.title}</h1>
            <p><strong>難易度:</strong> {challenge.difficulty}</p>
            <p>問題文：英字と数字が混在する文字列から数字だけを抜き出し、ハイフンに置き換えなさい。</p>

            <hr style={{ margin: '2rem 0' }} />

            <div>
              <label>正規表現：</label><br />
              <input
                type="text"
                value={regexInput}
                onChange={(e) => setRegexInput(e.target.value)}
                placeholder=""
                style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
              />

              <label>置換文字列：</label><br />
              <input
                type="text"
                value={replaceInput}
                onChange={(e) => setReplaceInput(e.target.value)}
                placeholder=""
                style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
              />

              <div style={{ marginBottom: '1rem' }}>
                <button onClick={handleTest} style={{ marginRight: '1rem' }}>
                  テスト
                </button>
                <button onClick={handleSubmit}>回答</button>
              </div>

              <p><strong>テスト対象:</strong> {sampleText}</p>
              {testResult !== null && (
                <p><strong>結果:</strong> {testResult}</p>
              )}
            </div>
          </>
        ) : (
          <p>該当するチャレンジが見つかりませんでした。</p>
        )}
      </div>
    </>
  );
};

export default ChallengePage;
