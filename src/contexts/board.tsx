import { BoardSize, GamePlayer } from 'consts';
import React, { useState, useEffect } from 'react';
import { CheckerPosition } from 'types';
import { PlayTime } from 'types';
import { GameBoard, getAIPlayerCheckerMovement } from 'utils';

interface BoardContextProviderProps {
  children: React.ReactNode;
}

interface BoardContextType {
  boardSize: number;
  board: GameBoard;
  highlightedPositions: CheckerPosition[];
  playTime: PlayTime;
  highlightPositions: (position: CheckerPosition) => void;
  setBoardSize: (size: number) => void;
  moveChecker: (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => void;
  startNewGame: () => void;
  revertMove: () => void;
  increasePlayerTime: () => void;
}

export const BoardContext = React.createContext<BoardContextType>({
  boardSize: BoardSize.SMALL,
  board: new GameBoard(),
  highlightedPositions: [],
  playTime: { [GamePlayer.BLUE]: 0, [GamePlayer.RED]: 0 },
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
  increasePlayerTime: () => {
    // Increase player playing time
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
  const [playTime, setPlayTime] = useState<PlayTime>({
    [GamePlayer.BLUE]: 0,
    [GamePlayer.RED]: 0,
  });
  // const [isAIPlayer, setIsAIPlayer] = useState<boolean>(true);

  const moveChecker = (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ) => {
    if (board.isAvailableToMove(fromPosition, toPosition)) {
      const fromCell = board.getCell(fromPosition);
      if (
        fromCell
          .getPossibleMovements()
          .filter(
            (position) =>
              position.row === toPosition.row && position.col === toPosition.col
          ).length
      ) {
        fromCell.move(toPosition);
        setBoard(board.getNewBoard());

        setTimeout(() => {
          const move = getAIPlayerCheckerMovement(board);
          if (!move) {
            // board.changeTurn();
          } else {
            const fromCell = board.getCell(move.fromPosition);
            fromCell.move(move.toPosition);
            setBoard(board.getNewBoard());
          }
        }, 500);
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
    const board = new GameBoard(boardSize);
    board.saveToLS();
    setBoard(board);

    setPlayTime({
      [GamePlayer.BLUE]: 0,
      [GamePlayer.RED]: 0,
    });
  };

  const changeBoardSize = (boardSize: number) => {
    setBoardSize(boardSize);
    const board = new GameBoard(boardSize);
    board.saveToLS();
    setBoard(board);

    setPlayTime({
      [GamePlayer.BLUE]: 0,
      [GamePlayer.RED]: 0,
    });
  };

  const increasePlayerTime = () => {
    setPlayTime((playTime) => ({
      ...playTime,
      [board.player]: playTime[board.player] + 1,
    }));
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
        playTime,
        highlightPositions,
        setBoardSize: changeBoardSize,
        moveChecker,
        startNewGame,
        revertMove,
        increasePlayerTime,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
