import { BoardCellState, BoardSize, GamePlayer } from 'consts';
import React, { useState } from 'react';
import { CheckerPosition } from 'types';
import { GameBoard } from 'utils';

interface BoardContextProviderProps {
  children: React.ReactNode;
}

interface BoardContextType {
  boardState: number[][];
  boardSize: number;
  playerTurn: GamePlayer;
  moveBall: (from: CheckerPosition, to: CheckerPosition) => void;
}

export const BoardContext = React.createContext<BoardContextType>({
  boardState: [],
  boardSize: BoardSize.SMALL,
  playerTurn: GamePlayer.BLUE,
  moveBall: () => {
    // Move the ball to a new position
  },
});

export const BoardContextProvider: React.FC<BoardContextProviderProps> = ({
  children,
}) => {
  const [boardSize, setBoardSize] = useState<number>(BoardSize.SMALL);
  const [boardState, setBoardState] = useState<number[][]>(
    GameBoard.getNewBoard(boardSize)
  );
  const [playerTurn, setPlayerTurn] = useState<GamePlayer>(GamePlayer.BLUE);

  const moveBall = (from: CheckerPosition, to: CheckerPosition) => {
    const newBoardState = boardState.map((row) => row.map((cell) => cell));
    newBoardState[to.row][to.col] = newBoardState[from.row][from.col];
    newBoardState[from.row][from.col] = BoardCellState.EMPTY;

    boardState[from.row][from.col];
    setPlayerTurn(3 - playerTurn);
  };

  return (
    <BoardContext.Provider
      value={{
        boardState,
        boardSize,
        playerTurn,
        moveBall,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
