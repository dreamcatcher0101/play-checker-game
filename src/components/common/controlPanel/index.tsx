import React, { useContext } from 'react';
import './style.css';
import { BoardContext } from 'contexts/board';

export const ControlPanelComponent: React.FC = () => {
  const { startNewGame } = useContext(BoardContext);

  const handleNewGame = () => {
    startNewGame();
  };

  return (
    <div className="control-panel__container">
      <div className="control-button__container" onClick={handleNewGame}>
        New Game
      </div>
      <div className="control-button__container">Options</div>
      <div className="control-button__container">Revert</div>
    </div>
  );
};
