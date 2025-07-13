import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { challenges } from '../data/challenges';
import Header from '../components/Header';

const ITEMS_PER_PAGE = 10;

const ListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(challenges.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = challenges.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1>正規表現チャレンジ一覧</h1>
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
              onClick={() => setCurrentPage(page)}
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