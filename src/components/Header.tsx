import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{
      padding: '1rem',
      backgroundColor: '#282c34',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>正規表現チャレンジ</h2>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>一覧</Link>
      </nav>
    </header>
  );
};

export default Header;