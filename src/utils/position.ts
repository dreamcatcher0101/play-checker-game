import { CheckerPosition } from 'types';

/**
 * Convert the checker position to human readable position in the board
 * @param position Checker position
 * @returns String of converted position
 */
export const convertCheckerPositionToString = (position: CheckerPosition) => {
  return `${position.row + 1},${String.fromCharCode(
    'A'.charCodeAt(0) + position.col
  )}`;
};
