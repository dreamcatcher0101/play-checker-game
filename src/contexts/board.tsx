import { BoardSize, GamePlayer } from 'consts';
import React, { useState } from 'react';
import { CheckerPosition } from 'types';
import { gameBoard } from 'utils';

interface BoardContextProviderProps {
  children: React.ReactNode;
}

interface BoardContextType {
  boardState: number[][];
  boardSize: number;
  playerTurn: GamePlayer;
  moveChecker: (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => void;
  setBoardSize: (size: number) => void;
}

export const BoardContext = React.createContext<BoardContextType>({
  boardState: [],
  boardSize: BoardSize.SMALL,
  playerTurn: GamePlayer.BLUE,
  moveChecker: () => {
    // Move the ball to a new position
  },
  setBoardSize: () => {
    // Set the size of game board
  },
});

export const BoardContextProvider: React.FC<BoardContextProviderProps> = ({
  children,
}) => {
  const [boardSize, setBoardSize] = useState<number>(BoardSize.SMALL);
  const [boardState, setBoardState] = useState<number[][]>(gameBoard.state);
  const [playerTurn] = useState<GamePlayer>(GamePlayer.BLUE);

  const moveChecker = (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => {
    const result = gameBoard.canMoveChecker(fromPosition, toPosition);
    if (result.isStateUpdated && result.newBoardState) {
      setBoardState(result.newBoardState);
      gameBoard.setNewBoardState(result.newBoardState);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        boardState,
        boardSize,
        playerTurn,
        moveChecker,
        setBoardSize,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
