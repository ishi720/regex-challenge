import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import { challenges as stubChallenges } from '../data/challenges';
import { USE_DATA_MODE, API_ENDPOINT } from '../config';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  challengeId: string;
  sampleInputs: string[];
  expectedOutputs: string[][];
  createdAt: string;
  updatedAt: string;
}

const ChallengePage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [regexInput, setRegexInput] = useState('');
  const [replaceInput, setReplaceInput] = useState('');
  const [testResults, setTestResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        if (USE_DATA_MODE === 'STUB') {
          const found = stubChallenges.find((c) => c.challengeId === challengeId);
          setChallenge(found || null);
        } else {
          const res = await fetch(`${API_ENDPOINT}/challenges/${challengeId}`);
          if (!res.ok) throw new Error(`APIエラー: ${res.status}`);
          const data = await res.json();

          // camelCaseに変換
          const formatted: Challenge = {
            id: data.id,
            title: data.title,
            description: data.description,
            difficulty: data.difficulty,
            challengeId: data.challenge_id,
            sampleInputs: JSON.parse(data.sample_inputs),
            expectedOutputs: JSON.parse(data.expected_outputs),
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };

          setChallenge(formatted);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('データの取得に失敗しました');
        }
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // 「テスト」ボタンの処理
  const handleTest = () => {
    if (!challenge) return;
    try {
      const regex = new RegExp(regexInput, 'gu');
      const results = challenge.sampleInputs.map((text) =>
        text.replace(regex, replaceInput)
      );
      setTestResults(results);
    } catch (error) {
      setTestResults(
        challenge.sampleInputs.map(() => `正規表現の構文エラーです: ${error}`)
      );
    }
  };

  // 「回答」ボタンの処理
  const handleSubmit = async () => {
    if (!challenge) return;

    // 確認ダイアログ
    const confirmed = window.confirm('ほんとうに回答してもいいですか？');
    if (!confirmed) return;

    try {
      if (USE_DATA_MODE === 'STUB') {
        // STUBモードでは結果登録をスキップ
        navigate(`/result/${challenge.challengeId}`);

      } else {
        // APIモードでは結果を登録
        const response = await fetch(`${API_ENDPOINT}/results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'test-user', // 仮のユーザーID
            challengeId: challenge.challengeId,
            regex: regexInput,
            replacement: replaceInput,
            isCorrect: true, // 仮の正誤判定
          }),
        });

        // APIエラーチェック
        if (!response.ok) {
          throw new Error(`登録失敗: ${response.status}`);
        }

        // 返信データを取得して結果ページへ遷移
        const result = await response.json();
        navigate(`/result/${challenge.challengeId}`, { state: result });
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`エラー: ${err.message}`);
      } else {
        alert('予期せぬエラーが発生しました');
      }
    }
  };


  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem' }}>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : !challenge ? (
          <p>読み込み中またはチャレンジが見つかりませんでした。</p>
        ) : (
          <>
            {/* タイトル */}
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
              {challenge.title}
            </h1>

            {/* 難易度と説明 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p><strong>難易度:</strong> {challenge.difficulty}</p>
              <p><strong>問題文:</strong></p>
              <p style={{ whiteSpace: 'pre-line', marginLeft: '1rem' }}>
                {challenge.description}
              </p>
            </div>

            {/* サンプル入力と期待される出力 */}
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#fafafa'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>結果サンプル①</h3>
              <p><strong>入力:</strong> {challenge.sampleInputs[0]}</p>
              <p><strong>期待される出力:</strong> {challenge.expectedOutputs[0]}</p>
            </div>

            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#fafafa'
            }}>
              <h3 style={{ marginBottom: '0.5rem' }}>結果サンプル②</h3>
              <p><strong>入力:</strong> {challenge.sampleInputs[1]}</p>
              <p><strong>期待される出力:</strong> {challenge.expectedOutputs[1]}</p>
            </div>

            <hr style={{ margin: '2rem 0' }} />

            {/* 正規表現入力フォーム */}
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

              {/* テスト・回答ボタン */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleTest}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    border: '1px solid #007bff',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = '#0056b3')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = '#007bff')
                  }
                >
                  テスト
                </button>

                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    border: '1px solid #28a745',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = '#1e7e34')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = '#28a745')
                  }
                >
                  回答
                </button>
              </div>

              {/* テスト結果表示 */}
              {challenge.sampleInputs.map((input, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <p><strong>入力{i + 1}:</strong> {input}</p>
                  {testResults[i] !== undefined && (
                    <>
                      <p><strong>結果:</strong> {testResults[i]}</p>
                      <p>
                        判定:{' '}
                        {challenge.expectedOutputs[i].includes(testResults[i])
                          ? <span style={{ color: 'green' }}>✅ OK</span>
                          : <span style={{ color: 'red' }}>❌ NG</span>}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChallengePage;
