import { BoardCellState } from 'consts';

export const getNewBoard = (size: number) => {
  return new Array(size).fill(0).map((_, row) =>
    new Array(size).fill(0).map((_, col) => {
      if (row < size / 2 - 1) {
        return (row + col) % 2
          ? BoardCellState.BLUE_CHECKER
          : BoardCellState.EMPTY;
      } else if (row > size / 2) {
        return (row + col) % 2
          ? BoardCellState.RED_CHECKER
          : BoardCellState.EMPTY;
      } else {
        return BoardCellState.EMPTY;
      }
    })
  );
};
