import React from 'react';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem' }}>
        <h1>正規表現チャレンジへようこそ！</h1>
        <p>このアプリでは正規表現の問題を解いて、腕を磨くことができます。</p>
        <Link to="/list">▶ チャレンジ一覧へ進む</Link>
      </div>
    </>
  );
};

export default HomePage;