import React, { useContext } from 'react';
import { ConfirmModalComponent } from '../confirmModal';
import { GameOptionsModalComponent } from '../optionsModal';
import { PlayTimePanelComponent } from './playTimePanel';
import './style.css';
import { BoardContext, ModalContext } from 'contexts';

interface ButtonProps {
  as?: React.ElementType;
  children: React.ReactNode;
  filled?: boolean;
  secondary?: boolean;
  role?: string;
  onClick?: () => void;
}

export const ControlPanelComponent: React.FC = () => {
  const Button = ({
    as: Component = 'button',
    children,
    filled,
    secondary,
    role,
    onClick,
  }: ButtonProps) => {
    return (
      <Component
        className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${
          filled ? 'dir-control--filled' : ''
        }`}
        role={role}
        onClick={onClick}
      >
        {children}
        <span />
        <span />
        <span />
        <span />
        <b aria-hidden="true">{children}</b>
        <b aria-hidden="true">{children}</b>
        <b aria-hidden="true">{children}</b>
        <b aria-hidden="true">{children}</b>
      </Component>
    );
  };

  const { board, startNewGame, setBoardSize, revertMove } =
    useContext(BoardContext);
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

  const handleRevert = () => {
    revertMove();
  };

  return (
    <div className="control-panel__container">
      <Button role="button" secondary onClick={() => handleNewGame()}>
        New Game
      </Button>
      <Button role="button" secondary onClick={() => handleOptions()}>
        Options
      </Button>
      <Button role="button" secondary onClick={() => handleRevert()}>
        Revert
      </Button>
      <PlayTimePanelComponent />
      <div className="moves-number__container">
        Number of moves: {board.numberOfMoves}
      </div>
    </div>
  );
};
