import { GAME_SIZE, CellState } from 'consts';

export class GameBoard {
  width: number = GAME_SIZE.SMALL;
  height: number = GAME_SIZE.SMALL;
  state: number[][] = [];

  constructor() {
    this.state = new Array(this.width).fill(0).map((_, rowIndex) =>
      new Array(this.height).fill(0).map((_, colIndex) => {
        if (rowIndex < this.width / 2 - 1) {
          return (rowIndex + colIndex) % 2
            ? CellState.BLUE_CHECKER
            : CellState.EMPTY;
        } else if (rowIndex > this.width / 2) {
          return (rowIndex + colIndex) % 2
            ? CellState.RED_CHECKER
            : CellState.EMPTY;
        } else {
          return CellState.EMPTY;
        }
      })
    );
  }

  getState = (row: number, col: number): number => {
    return this.state[row][col];
  };
}
