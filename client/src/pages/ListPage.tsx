import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import { challenges as stubChallenges } from '../data/challenges';
import { USE_STUB_DATA, API_ENDPOINT } from '../config';

const ITEMS_PER_PAGE = 12;

interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  challengeId: string;
}

const ListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const totalPages = Math.ceil(challenges.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = challenges.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams({ page: String(totalPages) });
    }
  }, [currentPage, totalPages, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (USE_STUB_DATA) {
          setChallenges(stubChallenges);
        } else {
          const res = await fetch(API_ENDPOINT + '/challenges');
          if (!res.ok) throw new Error(`APIエラー: ${res.status}`);
          const data = await res.json();
          // キーを変換（snake_case → camelCase）
          const formattedData = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            difficulty: item.difficulty,
            challengeId: item.challenge_id,
            sampleInputs: item.sample_inputs,
            expectedOutputs: item.expected_outputs,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));

          setChallenges(formattedData);
        }
      } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('データの取得に失敗しました');
          }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case '初級': return '#38bdf8';
      case '中級': return '#facc15';
      case '上級': return '#f87171';
      default: return '#e5e7eb';
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>チャレンジ一覧</h1>

        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {currentItems.map((challenge) => (
                <div key={challenge.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  background: 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{challenge.title}</h2>
                    <span style={{
                      backgroundColor: getBadgeColor(challenge.difficulty),
                      color: 'white',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <Link to={`/challenge/${challenge.challengeId}`}>
                    <button style={{
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      チャレンジを始める
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* ページネーション */}
            <div style={{ marginTop: '1rem' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    margin: '0 5px',
                    padding: '5px 10px',
                    fontWeight: page === currentPage ? 'bold' : 'normal',
                    backgroundColor: page === currentPage ? '#61dafb' : '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListPage;
