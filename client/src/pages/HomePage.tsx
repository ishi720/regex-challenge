import React from 'react';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const styles = {
    main: {
      padding: '4rem 2rem',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      textAlign: 'center' as const,
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      color: '#1f2937',
    },
    paragraph: {
      fontSize: '1.125rem',
      color: '#4b5563',
      marginBottom: '2rem',
      maxWidth: '600px',
    },
    button: {
      display: 'inline-block',
      backgroundColor: '#2563eb',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      textDecoration: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#1e40af',
    },
  };

  // マウスオーバーでボタン色変化
  const [isHover, setIsHover] = React.useState(false);

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main style={styles.main}>
        <h1 style={styles.heading}>正規表現チャレンジへようこそ！</h1>
        <p style={styles.paragraph}>
          このアプリでは正規表現の問題を解いて、腕を磨くことができます。
        </p>
        <Link
          to="/list"
          style={{
            ...styles.button,
            backgroundColor: isHover ? styles.buttonHover.backgroundColor : styles.button.backgroundColor,
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          ▶ チャレンジ一覧へ進む
        </Link>
      </main>
    </>
  );
};

export default HomePage;
