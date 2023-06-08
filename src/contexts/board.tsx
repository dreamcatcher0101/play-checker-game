import { BoardSize } from 'consts';
import React, { useState, useEffect } from 'react';
import { CheckerPosition } from 'types';
import { GameBoard, getAIPlayerCheckerMovement } from 'utils';

interface BoardContextProviderProps {
  children: React.ReactNode;
}

interface BoardContextType {
  boardSize: number;
  board: GameBoard;
  highlightedPositions: CheckerPosition[];
  highlightPositions: (position: CheckerPosition) => void;
  setBoardSize: (size: number) => void;
  moveChecker: (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => void;
  startNewGame: () => void;
  revertMove: () => void;
}

export const BoardContext = React.createContext<BoardContextType>({
  boardSize: BoardSize.SMALL,
  board: new GameBoard(),
  highlightedPositions: [],
  highlightPositions: () => {
    // Highlight possible movements
  },
  setBoardSize: () => {
    // Set the size of game board
  },
  moveChecker: () => {
    // Move the ckecker
  },
  startNewGame: () => {
    // Start new game
  },
  revertMove: () => {
    // Revert the last move
  },
});

export const BoardContextProvider: React.FC<BoardContextProviderProps> = ({
  children,
}) => {
  const [boardSize, setBoardSize] = useState<number>(BoardSize.SMALL);
  const [board, setBoard] = useState<GameBoard>(new GameBoard());
  const [highlightedPositions, setHighlightedPositions] = useState<
    CheckerPosition[]
  >([]);

  const moveChecker = (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => {
    console.log(board.isAvailableToMove(fromPosition, toPosition));
    if (board.isAvailableToMove(fromPosition, toPosition)) {
      const fromCell = board.getCell(fromPosition);
      fromCell.move(toPosition);
      setBoard(board.getNewBoard());

      const move = getAIPlayerCheckerMovement(board);
      if (!move) {
        board.changeTurn();
      } else {
        const fromCell = board.getCell(move.fromPosition);
        fromCell.move(move.toPosition);
        setBoard(board.getNewBoard());
      }
    }
    setHighlightedPositions([]);
  };

  const revertMove = () => {
    board.revertLastMove();
    setBoard(board.getNewBoard());
  };

  const highlightPositions = (position: CheckerPosition) => {
    const cell = board.getCell(position);
    if (board.isAvailableToMove(position)) {
      setHighlightedPositions(cell.getPossibleMovements());
    } else {
      setHighlightedPositions([]);
    }
  };

  const startNewGame = () => {
    setBoard(new GameBoard(boardSize));
  };

  const changeBoardSize = (boardSize: number) => {
    setBoardSize(boardSize);
    setBoard(new GameBoard(boardSize));
  };

  useEffect(() => {
    setBoard(board.loadFromLS());
  }, []);

  return (
    <BoardContext.Provider
      value={{
        board,
        boardSize,
        highlightedPositions,
        highlightPositions,
        setBoardSize: changeBoardSize,
        moveChecker,
        startNewGame,
        revertMove,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
