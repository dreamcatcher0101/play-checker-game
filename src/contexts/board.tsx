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
  // Size of the board
  const [boardSize, setBoardSize] = useState<number>(BoardSize.SMALL);
  // Instance of GameBoard
  const [board, setBoard] = useState<GameBoard>(new GameBoard());
  // Possible movement positions when the mouse over the cell
  // Used to highlight the possible movement positions
  const [highlightedPositions, setHighlightedPositions] = useState<
    CheckerPosition[]
  >([]);

  const moveChecker = (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => {
    if (board.isAvailableToMove(fromPosition, toPosition)) {
      // Operates the current move
      const fromCell = board.getCell(fromPosition);
      fromCell.move(toPosition);
      setBoard(board.getNewBoard());

      // Get the AI player's next move
      setTimeout(() => {
        const move = getAIPlayerCheckerMovement(board);
        // If no possible moves for the AI player, change turn
        if (!move) {
          board.changeTurn();
        } else {
          // Operates the AI player's move
          const fromCell = board.getCell(move.fromPosition);
          fromCell.move(move.toPosition);
          setBoard(board.getNewBoard());
        }
      }, 500);
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
    const board = new GameBoard(boardSize);
    board.saveToLS();
    setBoard(board);
  };

  const changeBoardSize = (boardSize: number) => {
    setBoardSize(boardSize);
    const board = new GameBoard(boardSize);
    board.saveToLS();
    setBoard(board);
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
