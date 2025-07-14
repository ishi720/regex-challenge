import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { challenges } from '../data/challenges';
import Breadcrumbs from '../components/Breadcrumbs';

const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const challengeId = Number(id);
  const challenge = challenges.find((c) => c.id === challengeId);

  const [regexInput, setRegexInput] = useState('');
  const [replaceInput, setReplaceInput] = useState('');
  const [testResults, setTestResults] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleTest = () => {
    if (!challenge) return;
    try {
      const regex = new RegExp(regexInput, 'gu');
      const results = challenge.sampleInputs.map((text) =>
        text.replace(regex, replaceInput)
      );
      setTestResults(results);
    } catch (error) {
      setTestResults(challenge.sampleInputs.map(() => `正規表現の構文エラーです: ${error}`));
    }
  };

  const handleSubmit = () => {
    const confirmed = window.confirm('ほんとうに回答してもいいですか？');
    if (confirmed) {
      navigate(`/result/${challengeId}`);
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem' }}>
        {challenge ? (
          <>
            <h1>{challenge.title}</h1>
            <p><strong>難易度:</strong> {challenge.difficulty}</p>
            <p>問題文：{challenge.description}</p>

            <hr style={{ margin: '2rem 0' }} />

            <div>
              <label>正規表現：</label><br />
              <input
                type="text"
                value={regexInput}
                onChange={(e) => setRegexInput(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
              />

              <label>置換文字列：</label><br />
              <input
                type="text"
                value={replaceInput}
                onChange={(e) => setReplaceInput(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
              />

              <div style={{ marginBottom: '1rem' }}>
                <button onClick={handleTest} style={{ marginRight: '1rem' }}>
                  テスト
                </button>
                <button onClick={handleSubmit}>回答</button>
              </div>

              {challenge.sampleInputs.map((input, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <p><strong>入力{i + 1}:</strong> {input}</p>
                  {testResults[i] !== undefined && (
                    <p><strong>結果:</strong> {testResults[i]}</p>
                  )}
                </div>
              ))}
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