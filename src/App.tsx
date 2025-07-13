import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';

const ChallengePage = () => <div><h1>チャレンジページ</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
