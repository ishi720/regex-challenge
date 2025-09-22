import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import { challenges as stubChallenges } from "../data/challenges";
import { USE_DATA_MODE, API_ENDPOINT } from "../config";

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
  const [regexInput, setRegexInput] = useState("");
  const [replaceInput, setReplaceInput] = useState("");
  const [testResults, setTestResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        if (USE_DATA_MODE === "STUB") {
          const found = stubChallenges.find((c) => c.challengeId === challengeId);
          setChallenge(found || null);
        } else {
          const res = await fetch(`${API_ENDPOINT}/challenges/${challengeId}`);
          if (!res.ok) throw new Error(`APIエラー: ${res.status}`);
          const data = await res.json();

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
        setError(err instanceof Error ? err.message : "データの取得に失敗しました");
      }
    };

    fetchChallenge();
  }, [challengeId]);

  const handleTest = () => {
    if (!challenge) return;
    try {
      const regex = new RegExp(regexInput, "gu");
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

  const handleSubmit = async () => {
    if (!challenge) return;
    const confirmed = window.confirm("ほんとうに回答してもいいですか？");
    if (!confirmed) return;

    try {
      if (USE_DATA_MODE === "STUB") {
        navigate(`/result/${challenge.challengeId}`);
      } else {
        const response = await fetch(`${API_ENDPOINT}/results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "test-user",
            challengeId: challenge.challengeId,
            regex: regexInput,
            replacement: replaceInput,
            isCorrect: true,
          }),
        });

        if (!response.ok) throw new Error(`登録失敗: ${response.status}`);
        const result = await response.json();
        navigate(`/result/${challenge.challengeId}`, { state: result });
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? `エラー: ${err.message}` : "予期せぬエラーが発生しました");
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className="max-w-4xl mx-auto p-6">
        {error ? (
          <p className="text-red-600 font-semibold">{error}</p>
        ) : !challenge ? (
          <p className="text-gray-500">読み込み中またはチャレンジが見つかりませんでした。</p>
        ) : (
          <>
            {/* タイトル */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {challenge.title}
            </h1>

            {/* 難易度と説明 */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">問題</h2>
            <div className="mb-6 bg-white shadow rounded-lg p-4">
              <p className="mb-2">
                <span className="font-semibold">難易度:</span>{" "}
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                  {challenge.difficulty}
                </span>
              </p>
              <p className="font-semibold">問題文:</p>
              <p className="whitespace-pre-line ml-2 text-gray-700">
                {challenge.description}
              </p>
            </div>

            {/* サンプル入出力 */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {challenge.sampleInputs.slice(0, 2).map((input, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <h3 className="font-semibold mb-2 text-gray-700">
                    結果サンプル {i + 1}
                  </h3>
                  <p>
                    <span className="font-semibold">入力:</span> {input}
                  </p>
                  <p>
                    <span className="font-semibold">期待される出力:</span>{" "}
                    {challenge.expectedOutputs[i]}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">回答を入力</h2>
            {/* 正規表現入力 */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <label className="block font-semibold mb-1">正規表現：</label>
              <input
                type="text"
                value={regexInput}
                onChange={(e) => setRegexInput(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
              />

              <label className="block font-semibold mb-1">置換文字列：</label>
              <input
                type="text"
                value={replaceInput}
                onChange={(e) => setReplaceInput(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
              />

              {/* ボタン */}
              <div className="flex gap-3">
                <button
                  onClick={handleTest}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  テスト
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                >
                  回答
                </button>
              </div>
            </div>

            {/* テスト結果 */}
            <div className="space-y-4">
              {challenge.sampleInputs.map((input, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p>
                    <span className="font-semibold">入力{i + 1}:</span> {input}
                  </p>
                  {testResults[i] !== undefined && (
                    <>
                      <p>
                        <span className="font-semibold">結果:</span>{" "}
                        {testResults[i]}
                      </p>
                      <p>
                        判定:{" "}
                        {challenge.expectedOutputs[i].includes(testResults[i]) ? (
                          <span className="text-green-600 font-bold">✅ OK</span>
                        ) : (
                          <span className="text-red-600 font-bold">❌ NG</span>
                        )}
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
