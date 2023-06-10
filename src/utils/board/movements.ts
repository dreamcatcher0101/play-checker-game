import { BoardCellState } from 'consts';
import { CheckerPosition } from 'types';

// List of checker offsets for each movement
// Contains the soldier & king checker movement
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
  [BoardCellState.BLUE_KING_CHECKER]: [
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
  [BoardCellState.RED_KING_CHECKER]: [
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

/**
 * List the possible normal movement positions
 * @param state Board cell state
 * @param position Position in the board
 * @param boardSize Size of board
 * @returns Array of the possible move positions
 */
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

/**
 * List the possible capture movement positions
 * @param state Board cell state
 * @param position Position in the board
 * @param boardSize Size of board
 * @returns Array of enemy checker position and the possible move positions
 */
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

/**
 * Check the position is out of the board or not
 * @param position Position in the board
 * @param boardSize Size of the board
 * @returns True if it's out of board, false if not
 */
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
