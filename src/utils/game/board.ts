import { BoardCellState, BoardSize } from 'consts';
import { CheckerPosition } from 'types';

interface NewBoardState {
  isStateUpdated: boolean;
  newBoardState?: number[][];
}

class GameBoard {
  state: number[][] = [];

  constructor() {
    this.state = this.getNewBoard(BoardSize.SMALL);
  }

  public isDraggable = (position: CheckerPosition) => {
    if (!this.state[position.row]) {
      return false;
    }

    const cellState = this.state[position.row][position.col];
    if (cellState === undefined) {
      return false;
    }

    if (cellState === BoardCellState.EMPTY) {
      return false;
    }

    return true;
  };

  public isValidMove = (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition
  ): boolean => {
    // check that the drop position cell is empty or not
    if (this.state[toPosition.row][toPosition.col] !== BoardCellState.EMPTY) {
      return false;
    }

    // check that the movement is against the rule or not
    if (
      !(
        Math.abs(toPosition.row - fromPosition.row) ===
          Math.abs(toPosition.col - fromPosition.col) &&
        Math.abs(toPosition.col - fromPosition.col) < 3
      )
    ) {
      return false;
    }

    // check that the movement is normal move
    // normal move means that doesn't take opponent's checker
    // need to check any possible movement that can take opponent's checker
    // if (Math.abs(toPosition.row - fromPosition.row) === 1) {
    // }

    // check that the movement is taking opponent's checker or not
    const dRow = toPosition.row - fromPosition.row;
    const dCol = toPosition.col - fromPosition.col;
    const opponentCheckerPosition = {
      row: fromPosition.row + dRow / 2,
      col: fromPosition.col + dCol / 2,
    };

    if (
      this.state[opponentCheckerPosition.row][opponentCheckerPosition.col] !==
      this.getOpponentChecker(this.state[fromPosition.row][fromPosition.col])
    ) {
      return false;
    }

    return true;
  };

  public canMoveChecker = (
    from: CheckerPosition,
    to: CheckerPosition
  ): NewBoardState => {
    if (this.isValidMove(from, to)) {
      const newBoardState = this.state.map((row: number[]) => Array.from(row));
      newBoardState[to.row][to.col] = newBoardState[from.row][from.col];
      newBoardState[from.row][from.col] = BoardCellState.EMPTY;

      return {
        isStateUpdated: true,
        newBoardState,
      };
    }
    return {
      isStateUpdated: false,
    };
  };

  public setNewBoardState = (state: number[][]) => {
    this.state = state.map((row: number[]) => Array.from(row));
  };

  private getNewBoard = (boardSize: number) => {
    return new Array(boardSize).fill(0).map((_, row) =>
      new Array(boardSize).fill(0).map((_, col) => {
        if (row < boardSize / 2 - 1) {
          return (row + col) % 2
            ? BoardCellState.BLUE_CHECKER
            : BoardCellState.EMPTY;
        } else if (row > boardSize / 2) {
          return (row + col) % 2
            ? BoardCellState.RED_CHECKER
            : BoardCellState.EMPTY;
        } else {
          return BoardCellState.EMPTY;
        }
      })
    );
  };

  private getOpponentChecker = (cellState: BoardCellState) => {
    switch (cellState) {
      case BoardCellState.BLUE_CHECKER:
        return BoardCellState.RED_CHECKER;
      case BoardCellState.RED_CHECKER:
        return BoardCellState.BLUE_CHECKER;
      default:
        return BoardCellState.EMPTY;
    }
  };
}

export const gameBoard = new GameBoard();
