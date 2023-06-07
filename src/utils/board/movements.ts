import { BoardCellState } from 'consts';
import { CheckerPosition } from 'types';

const possibleMovements: Record<string, CheckerPosition[]> = {
  [BoardCellState.BLUE_CHECKER]: [
    {
      row: 1,
      col: -1,
    },
    {
      row: 1,
      col: 1,
    },
  ],
  [BoardCellState.RED_CHECKER]: [
    {
      row: -1,
      col: 1,
    },
    {
      row: -1,
      col: -1,
    },
  ],
  [BoardCellState.BLUE_KING_CHECKER || BoardCellState.RED_KING_CHECKER]: [
    {
      row: 1,
      col: 1,
    },
    {
      row: 1,
      col: -1,
    },
    {
      row: -1,
      col: 1,
    },
    {
      row: -1,
      col: -1,
    },
  ],
};

export const getPossibleNormalPositions = (
  state: BoardCellState,
  position: CheckerPosition,
  boardSize: number
): CheckerPosition[] => {
  const offsets = possibleMovements[state] ?? [];

  const positions = offsets.map((offset) => ({
    row: position.row + offset.row,
    col: position.col + offset.col,
  }));

  return positions.filter((pos) => !isOutOfBoard(pos, boardSize));
};

export const getPossibleCapturePositions = (
  state: BoardCellState,
  position: CheckerPosition,
  boardSize: number
): {
  enemyCheckerPosition: CheckerPosition;
  movedPosition: CheckerPosition;
}[] => {
  const offsets = possibleMovements[state] ?? [];

  const positions: {
    enemyCheckerPosition: CheckerPosition;
    movedPosition: CheckerPosition;
  }[] = offsets.map((offset) => ({
    enemyCheckerPosition: {
      row: position.row + offset.row,
      col: position.col + offset.col,
    },
    movedPosition: {
      row: position.row + offset.row * 2,
      col: position.col + offset.col * 2,
    },
  }));

  return positions.filter(
    (pos) =>
      !isOutOfBoard(pos.enemyCheckerPosition, boardSize) &&
      !isOutOfBoard(pos.movedPosition, boardSize)
  );
};

export const isOutOfBoard = (
  position: CheckerPosition,
  boardSize: number
): boolean => {
  if (position.row < 0 || position.row >= boardSize) {
    return true;
  }
  if (position.col < 0 || position.col >= boardSize) {
    return true;
  }
  return false;
};
