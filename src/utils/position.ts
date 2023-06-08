import { CheckerPosition } from 'types';

export const convertCheckerPositionToString = (position: CheckerPosition) => {
  return `${position.row + 1},${String.fromCharCode(
    'A'.charCodeAt(0) + position.col
  )}`;
};
