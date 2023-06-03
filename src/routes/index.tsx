import React from "react";
import { Routes, Route } from "react-router-dom";
import { GameBoardPage } from "pages";
import { PATH } from "config";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={PATH.GAME_BOARD} element={<GameBoardPage />} />
    </Routes>
  );
};
