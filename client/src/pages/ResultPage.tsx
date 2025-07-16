import React from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem' }}>
        <h1  style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>結果ページ</h1>
        <p>このページはチャレンジID「{id}」の結果を表示しています。</p>
      </div>
    </>
  );
};

export default ResultPage;