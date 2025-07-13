import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListPage from './pages/ListPage';
import ChallengePage from './pages/ChallengePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;