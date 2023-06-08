import { BoardCellState, BoardSize, GamePlayer } from 'consts';
import { CheckerPosition } from 'types';
import { BoardCell } from './cell';
import { getNextPlayer } from './player';

interface MovementHistory {
  player: GamePlayer;
  state: BoardCellState;
  fromPosition: CheckerPosition;
  toPosition: CheckerPosition;
  capturedChecker: {
    position: CheckerPosition;
    state: BoardCellState;
  }[];
}

export class GameBoard {
  cells: BoardCell[][];
  boardSize: number;
  player: GamePlayer;

  movementHistory: MovementHistory[];

  constructor(
    boardSize: number = BoardSize.SMALL,
    cells: BoardCell[][] = [],
    player: GamePlayer = GamePlayer.RED,
    movementHistory: MovementHistory[] = []
  ) {
    this.boardSize = boardSize;

    this.cells = new Array(this.boardSize).fill(0).map((_, row) =>
      new Array(this.boardSize).fill(0).map((_, col) => {
        let state: BoardCellState;
        if (cells.length) {
          state = cells[row][col].state;
        } else {
          // calculate cell state
          if (row < boardSize / 2 - 1) {
            state =
              (row + col) % 2
                ? BoardCellState.BLUE_CHECKER
                : BoardCellState.EMPTY;
          } else if (row > boardSize / 2) {
            state =
              (row + col) % 2
                ? BoardCellState.RED_CHECKER
                : BoardCellState.EMPTY;
          } else {
            state = BoardCellState.EMPTY;
          }
        }
        // make new BoardCell instance with row, col and state
        const cell = new BoardCell(row, col, state, this);
        return cell;
      })
    );

    this.player = player;
    this.movementHistory = movementHistory;
  }

  /*------- Getter -------*/
  public getCell = (position: CheckerPosition): BoardCell => {
    return this.cells[position.row][position.col];
  };

  public getNewBoard = (): GameBoard => {
    return new GameBoard(
      this.boardSize,
      this.cells,
      this.player,
      this.movementHistory
    );
  };

  public getPossibleMovePositions = (
    position: CheckerPosition
  ): CheckerPosition[] => {
    return this.cells[position.row][position.col].getPossibleMovements();
  };

  /*------- Status -------*/
  public isAvailableToMove = (position: CheckerPosition): boolean => {
    const captureMovements = this.cells
      .map((cellRow) =>
        cellRow
          .filter(
            (cell) => cell.row !== position.row || cell.col !== position.col
          )
          .map((cell) => cell.getPossibleCaptureMovements().length)
          .reduce((result, value) => result + value, 0)
      )
      .reduce((result, value) => result + value, 0);

    if (this.getCell(position).getPossibleCaptureMovements().length) {
      return true;
    }

    return (
      !captureMovements &&
      !!this.getCell(position).getPossibleMovements().length
    );
  };

  /*------- Actions -------*/
  public changeTurn = () => {
    this.player = getNextPlayer(this.player);
  };

  public addHistory = (history: MovementHistory) => {
    this.movementHistory.push(history);
  };

  public revertLastMove = () => {
    const lastMovements = this.movementHistory.slice(-2);

    this.movementHistory = this.movementHistory.slice(
      0,
      this.movementHistory.length - lastMovements.length
    );

    lastMovements.reverse().forEach((move) => {
      this.getCell(move.fromPosition).state = move.state;
      this.getCell(move.toPosition).state = BoardCellState.EMPTY;

      move.capturedChecker.forEach((checker) => {
        this.getCell(checker.position).state = checker.state;
      });
      this.changeTurn();
    });
  };
}
