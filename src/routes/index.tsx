import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameBoardPage } from 'pages';
import { PATH } from 'config';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.GAME_BOARD} element={<GameBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
};
