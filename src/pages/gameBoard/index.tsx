import { GameBoardContainer } from 'containers';
import React from 'react';
import { withLayout } from 'components';

export const GameBoardPage: React.FC = withLayout(() => {
  return <GameBoardContainer />;
});
