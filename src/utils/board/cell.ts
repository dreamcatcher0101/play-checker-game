import {
  BoardCellState,
  GamePlayer,
  KING_CHECKER_MULTIPLE_TIMES,
} from 'consts';
import { CheckerPosition } from 'types';
import { GameBoard } from './board';
import {
  getPossibleNormalPositions,
  getPossibleCapturePositions,
} from './movements';

/**
 * BoardCell Class
 * Every cell of the game board
 */
export class BoardCell {
  row: number; // Row number in the board
  col: number; // Col number in the board
  board: GameBoard; // Game board instance
  state: BoardCellState; // Cell state

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
    const normalMovements = this.getPossibleNormalMovements();
    const captureMovements = this.getPossibleCaptureMovements();
    if (captureMovements.length) {
      return captureMovements.map((positions) => positions.movedPosition);
    } else {
      return normalMovements;
    }
  };

  public getPossibleNormalMovements = (): CheckerPosition[] => {
    // If the checker is not current player's checker, can not move
    if (!this.isTurn()) {
      return [];
    }

    // Get possible normal position from this cell position
    const possiblePositions = getPossibleNormalPositions(
      this.state,
      {
        row: this.row,
        col: this.col,
      },
      this.board.boardSize
    );

    // Return the positions that the cell is empty
    return possiblePositions.filter((position) =>
      this.board.getCell(position).isEmpty()
    );
  };

  public getPossibleCaptureMovements = (): {
    enemyCheckerPosition: CheckerPosition;
    movedPosition: CheckerPosition;
  }[] => {
    // If the checker is not current player's checker, can not move
    if (!this.isTurn()) {
      return [];
    }

    // Get possible capture position from this cell position
    const possiblePositions = getPossibleCapturePositions(
      this.state,
      {
        row: this.row,
        col: this.col,
      },
      this.board.boardSize
    );

    // Return the positions that can capture the enemy's checker
    // and can move to the empty cell
    return possiblePositions.filter(
      (positions) =>
        this.board.getCell(positions.movedPosition).isEmpty() &&
        this.isEmeny(this.board.getCell(positions.enemyCheckerPosition))
    );
  };

  /*------- Status -------*/
  public isTurn = (): boolean => {
    return (
      (this.board.player === GamePlayer.BLUE && this.isBlue()) ||
      (this.board.player === GamePlayer.RED && this.isRed())
    );
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

  public isKing = (): boolean => {
    return (
      this.state === BoardCellState.RED_KING_CHECKER ||
      this.state === BoardCellState.BLUE_KING_CHECKER
    );
  };

  /*------- Actions -------*/
  public move = (toPosition: CheckerPosition): boolean => {
    // Check if the movement is normal move or capture move
    // If it's valid move, need to update corresponding cells' state
    // Increase the number of moves
    // Change the current player's turn
    // Check the cells and make the checker king if it's reached to the end
    if (
      this.getPossibleNormalMovements().filter(
        (position) =>
          position.row === toPosition.row && position.col === toPosition.col
      ).length
    ) {
      // If this is possible move
      this.board.addHistory({
        player: this.board.player,
        state: this.state,
        fromPosition: {
          row: this.row,
          col: this.col,
        },
        toPosition,
        capturedChecker: [],
      });

      this.board.getCell(toPosition).state = this.state;
      this.state = BoardCellState.EMPTY;

      if (this.board.player === GamePlayer.RED) {
        this.board.numberOfMoves++;
      }

      this.board.changeTurn();

      this.board.updateCells();

      return true;
    } else if (
      this.getPossibleCaptureMovements().filter(
        (positions) =>
          positions.movedPosition.row === toPosition.row &&
          positions.movedPosition.col === toPosition.col
      ).length
    ) {
      // If this is capture move
      const [position] = this.getPossibleCaptureMovements().filter(
        (positions) =>
          positions.movedPosition.row === toPosition.row &&
          positions.movedPosition.col === toPosition.col
      );

      this.board.addHistory({
        player: this.board.player,
        state: this.state,
        fromPosition: {
          row: this.row,
          col: this.col,
        },
        toPosition,
        capturedChecker: [
          {
            position: position.enemyCheckerPosition,
            state: this.board.getCell(position.enemyCheckerPosition).state,
          },
        ],
      });

      this.board.getCell(position.movedPosition).state = this.state;
      this.board.getCell(position.enemyCheckerPosition).state =
        BoardCellState.EMPTY;
      this.state = BoardCellState.EMPTY;

      if (this.board.player === GamePlayer.RED) {
        this.board.numberOfMoves++;
      }

      this.board.changeTurn();

      this.board.updateCells();

      return true;
    } else {
      return false;
    }
  };

  public makeKing = () => {
    if (this.isBlue() && this.row !== this.board.boardSize - 1) {
      return;
    }
    if (this.isRed() && this.row !== 0) {
      return;
    }
    if (
      this.state === BoardCellState.BLUE_CHECKER ||
      this.state === BoardCellState.RED_CHECKER
    ) {
      this.state *= KING_CHECKER_MULTIPLE_TIMES;
    }
  };
}
