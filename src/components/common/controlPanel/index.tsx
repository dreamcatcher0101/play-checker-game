import React, { useContext } from 'react';
import { ConfirmModalComponent } from '../confirmModal';
import './style.css';
import { BoardContext, ModalContext } from 'contexts';

export const ControlPanelComponent: React.FC = () => {
  const { startNewGame } = useContext(BoardContext);
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
