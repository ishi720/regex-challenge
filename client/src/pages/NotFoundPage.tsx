import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <>
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>404 - ページが見つかりません</h1>
            <p>指定されたURLは存在しません。</p>
        </div>
    </>
  );
};

export default NotFoundPage;