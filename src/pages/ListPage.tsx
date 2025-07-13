import React from 'react';
import { challenges } from '../data/challenges';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ListPage: React.FC = () => {
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
            {challenges.map((challenge) => (
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
      </div>
    </>
  );
};

export default ListPage;
