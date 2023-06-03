import React from 'react';
import { AppRoutes } from 'routes';
import { BoardContextProvider } from 'contexts/board';

export const App: React.FC = () => {
  return (
    <BoardContextProvider>
      <AppRoutes />
    </BoardContextProvider>
  );
};
