import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{
      width: '100vw',
      boxSizing: 'border-box',
      padding: '1rem 2rem',
      backgroundColor: '#282c34',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
      正規表現チャレンジ</Link>
      <nav>
        <Link to="/about" style={{ color: 'white', marginRight: '1rem' }}>正規表現とは</Link>
      </nav>
    </header>
  );
};

export default Header;
