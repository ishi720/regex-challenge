import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { challenges } from '../data/challenges';

const ITEMS_PER_PAGE = 10;

const ListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const totalPages = Math.ceil(challenges.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = challenges.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setSearchParams({ page: String(totalPages) });
    }
  }, [currentPage, totalPages, setSearchParams]);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1>チャレンジ一覧</h1>

        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>タイトル</th>
              <th>難易度</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((challenge) => (
              <tr key={challenge.id}>
                <td>{challenge.id}</td>
                <td>{challenge.title}</td>
                <td>{challenge.difficulty}</td>
                <td>
                  <Link to={`/challenge/${challenge.id}`}>見る</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
    </>
  );
};

export default ListPage;
