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
  numberOfMoves: number;
  movementHistory: MovementHistory[];

  constructor(
    boardSize: number = BoardSize.SMALL,
    cells: BoardCell[][] = [],
    player: GamePlayer = GamePlayer.RED,
    numberOfMoves = 0,
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
    this.numberOfMoves = numberOfMoves;
    this.movementHistory = movementHistory;
  }

  /*------- Getter -------*/
  public getCell = (position: CheckerPosition): BoardCell => {
    return this.cells[position.row][position.col];
  };

  public getNewBoard = (): GameBoard => {
    const board = new GameBoard(
      this.boardSize,
      this.cells,
      this.player,
      this.numberOfMoves,
      this.movementHistory
    );
    board.saveToLS();
    return board;
  };

  public getPossibleMovePositions = (
    position: CheckerPosition
  ): CheckerPosition[] => {
    return this.cells[position.row][position.col].getPossibleMovements();
  };

  /*------- Status -------*/
  public isAvailableToMove = (
    fromPosition: CheckerPosition,
    toPosition: CheckerPosition | null = null
  ): boolean => {
    const captureMovements = this.cells
      .map((cellRow) =>
        cellRow
          .filter(
            (cell) =>
              cell.row !== fromPosition.row || cell.col !== fromPosition.col
          )
          .map((cell) => cell.getPossibleCaptureMovements().length)
          .reduce((result, value) => result + value, 0)
      )
      .reduce((result, value) => result + value, 0);

    if (this.getCell(fromPosition).getPossibleCaptureMovements().length) {
      return true;
    }

    let flag = !captureMovements;
    if (toPosition) {
      flag =
        flag &&
        !!this.getCell(fromPosition)
          .getPossibleMovements()
          .filter(
            (position) =>
              position.row === toPosition.row && position.col === toPosition.col
          ).length;
    } else {
      flag = flag && !!this.getCell(fromPosition).getPossibleMovements().length;
    }

    return flag;
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

  public saveToLS = () => {
    localStorage.setItem('boardSize', this.boardSize.toString());
    localStorage.setItem(
      'cells',
      JSON.stringify(
        this.cells.map((cellRow) =>
          cellRow.map((cell) => ({
            row: cell.row,
            col: cell.col,
            state: cell.state,
          }))
        )
      )
    );
    localStorage.setItem('player', this.player.toString());
    localStorage.setItem('numberOfMoves', this.numberOfMoves.toString());
    localStorage.setItem(
      'movementHistory',
      JSON.stringify(this.movementHistory)
    );
  };

  public loadFromLS = () => {
    const boardSize = Number(
      localStorage.getItem('boardSize') ?? BoardSize.SMALL
    );
    const cells: BoardCell[][] = JSON.parse(
      localStorage.getItem('cells') ?? '[]'
    );
    const player = Number(localStorage.getItem('player') ?? GamePlayer.RED);
    const numberOfMoves = Number(localStorage.getItem('numberOfMoves') ?? '0');
    const movementHistory: MovementHistory[] = JSON.parse(
      localStorage.getItem('movementHistory') ?? '[]'
    );

    return new GameBoard(
      boardSize,
      cells,
      player,
      numberOfMoves,
      movementHistory
    );
  };

  public updateCells = () => {
    this.cells.forEach((cellRow) =>
      cellRow.forEach((cell) => {
        cell.makeKing();
      })
    );
  };
}
