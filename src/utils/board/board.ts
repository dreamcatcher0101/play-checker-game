import { BoardCellState, BoardSize, GamePlayer } from 'consts';
import { CheckerPosition } from 'types';
import { BoardCell } from './cell';
import { getNextPLayer } from './player';

export class GameBoard {
  cells: BoardCell[][];
  boardSize: number;
  player: GamePlayer;

  constructor(
    boardSize: number = BoardSize.SMALL,
    cells: BoardCell[][] = [],
    player: GamePlayer = GamePlayer.BLUE
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
  }

  /*------- Getter -------*/
  public getCell = (position: CheckerPosition): BoardCell => {
    return this.cells[position.row][position.col];
  };

  public getNewBoard = (): GameBoard => {
    return new GameBoard(this.boardSize, this.cells, this.player);
  };

  public getPossibleMovePositions = (
    position: CheckerPosition
  ): CheckerPosition[] => {
    return this.cells[position.row][position.col].getPossibleMovements();
  };

  /*------- Actions -------*/
  public changeTurn = () => {
    this.player = getNextPLayer(this.player);
  };
}
