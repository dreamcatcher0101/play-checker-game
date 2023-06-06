import React from 'react';
import { AppRoutes } from 'routes';
import { BoardContextProvider, ModalContextProvider } from 'contexts';

export const App: React.FC = () => {
  return (
    <BoardContextProvider>
      <ModalContextProvider>
        <AppRoutes />
      </ModalContextProvider>
    </BoardContextProvider>
  );
};
