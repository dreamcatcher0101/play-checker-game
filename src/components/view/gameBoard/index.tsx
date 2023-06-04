import React from 'react';
import './style.css';
import {
  ControlPanelComponent,
  GameBoardComponent,
  HistoryPanelComponent,
} from 'components/common';

export const GameBoardView: React.FC = () => {
  return (
    <div className="game-board">
      <ControlPanelComponent />
      <GameBoardComponent />
      <HistoryPanelComponent />
    </div>
  );
};
