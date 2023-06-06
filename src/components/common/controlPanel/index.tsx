import React, { useContext } from 'react';
import { ConfirmModalComponent } from '../confirmModal';
import { GameOptionsModalComponent } from '../optionsModal';
import './style.css';
import { BoardContext, ModalContext } from 'contexts';

export const ControlPanelComponent: React.FC = () => {
  const { startNewGame, setBoardSize } = useContext(BoardContext);
  const modal = useContext(ModalContext);

  const handleNewGame = () => {
    modal.open(
      <ConfirmModalComponent
        handleConfirm={() => {
          startNewGame();
          modal.close();
        }}
        handleCancel={() => {
          modal.close();
        }}
        content="Do you really want to start the new game?"
      />,
      {
        title: 'Are you sure?',
      }
    );
  };

  const handleOptions = () => {
    modal.open(
      <GameOptionsModalComponent
        handleConfirm={(boardSize: number) => {
          setBoardSize(boardSize);
          modal.close();
        }}
        handleCancel={() => {
          modal.close();
        }}
      />,
      {
        title: 'Game Options',
      }
    );
  };

  return (
    <div className="control-panel__container">
      <div className="control-button__container" onClick={handleNewGame}>
        New Game
      </div>
      <div className="control-button__container" onClick={handleOptions}>
        Options
      </div>
      <div className="control-button__container">Revert</div>
    </div>
  );
};
