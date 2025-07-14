import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const crumbs: { label: string; to?: string }[] = [{ label: 'ホーム', to: '/' }];

  if (pathname === '/list') {
    crumbs.push({ label: 'チャレンジ一覧' });
  } else if (pathname === '/about') {
    crumbs.push({ label: 'このサイトについて' });
  } else if (pathname.startsWith('/challenge/')) {
    crumbs.push(
      { label: 'チャレンジ一覧', to: '/list' },
      { label: 'チャレンジ' }
    );
  } else if (pathname.startsWith('/result/')) {
    crumbs.push(
      { label: 'チャレンジ一覧', to: '/list' },
      { label: '結果' }
    );
  }

  return (
    <nav style={{ padding: '1rem 2rem', fontSize: '0.9rem' }}>
      {crumbs.map((crumb, idx) => (
        <span key={idx}>
          {idx > 0 && ' > '}
          {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : crumb.label}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;