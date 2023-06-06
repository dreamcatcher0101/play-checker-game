import {
  BoardCellState,
  GamePlayer,
  KING_CHECKER_MULTIPLE_TIMES,
} from 'consts';
import { CheckerPosition } from 'types';
import { GameBoard } from './board';
import { getPossiblePositions } from './movements';

export class BoardCell {
  row: number;
  col: number;
  board: GameBoard;
  state: BoardCellState;

  constructor(
    row: number,
    col: number,
    state: BoardCellState,
    board: GameBoard
  ) {
    this.row = row;
    this.col = col;
    this.state = state;
    this.board = board;
  }

  /*------- Getter -------*/
  public getPossibleMovements = (): CheckerPosition[] => {
    return [
      ...this.getPossibleNormalMovements(),
      ...this.getPossibleCaptureMovements(),
    ];
  };

  public getPossibleNormalMovements = (): CheckerPosition[] => {
    const possiblePositions = getPossiblePositions(
      this.state,
      {
        row: this.row,
        col: this.col,
      },
      this.board.boardSize
    );

    return possiblePositions.filter((position) =>
      this.board.getCell(position).isEmpty()
    );
  };

  public getPossibleCaptureMovements = (): CheckerPosition[] => {
    return [];
  };

  /*------- Status -------*/
  public isTurn = (): boolean => {
    return (
      (this.board.player === GamePlayer.BLUE && this.isBlue()) ||
      (this.board.player === GamePlayer.RED && this.isRed())
    );
  };

  public isAvailableToMove = (): boolean => {
    if (!this.isTurn()) {
      return false;
    }
    return !!this.getPossibleMovements().length;
  };

  public isEmpty = (): boolean => {
    return this.state === BoardCellState.EMPTY;
  };

  public isBlue = (): boolean => {
    return (
      this.state === BoardCellState.BLUE_CHECKER ||
      this.state === BoardCellState.BLUE_KING_CHECKER
    );
  };

  public isRed = (): boolean => {
    return (
      this.state === BoardCellState.RED_CHECKER ||
      this.state === BoardCellState.RED_KING_CHECKER
    );
  };

  public isEmeny = (cell: BoardCell): boolean => {
    if (cell.isBlue()) {
      return this.isRed();
    } else if (cell.isRed()) {
      return this.isBlue();
    } else {
      return false;
    }
  };

  /*------- Actions -------*/
  public move = (toPosition: CheckerPosition) => {
    if (this.isAvailableToMove()) {
      if (
        this.getPossibleNormalMovements().filter(
          (position) =>
            position.row === toPosition.row && position.col === toPosition.col
        ).length
      ) {
        this.board.getCell(toPosition).state = this.state;
        this.state = BoardCellState.EMPTY;
        this.board.changeTurn();
      } else if (
        this.getPossibleCaptureMovements().filter(
          (position) =>
            position.row === toPosition.row && position.col === toPosition.col
        ).length
      ) {
        const offset: CheckerPosition = {
          row: toPosition.row - this.row,
          col: toPosition.col - this.col,
        };
        const enemyCheckerPosition: CheckerPosition = {
          row: this.row + offset.row / 2,
          col: this.col + offset.col / 2,
        };
        this.board.getCell(toPosition).state = this.state;
        this.board.getCell(enemyCheckerPosition).state = this.state;
        this.state = BoardCellState.EMPTY;
      }
    }
  };

  public makeKing = () => {
    if (
      this.state === BoardCellState.BLUE_CHECKER ||
      this.state === BoardCellState.RED_CHECKER
    ) {
      this.state *= KING_CHECKER_MULTIPLE_TIMES;
    }
  };
}
