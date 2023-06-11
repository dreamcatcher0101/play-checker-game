import { BoardCellState, BoardSize } from 'consts';
import { GameBoard } from './board';
import { BoardCell } from './cell';

describe('Check game board cell', () => {
  test('constructor: game board cell initialization', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);
    const cell = new BoardCell(0, 0, BoardCellState.RED_CHECKER, gameBoard);

    expect(cell.row).toEqual(0);
    expect(cell.col).toEqual(0);
    expect(cell.state).toEqual(BoardCellState.RED_CHECKER);
  });

  describe('getPossibleMovements: get possible movements', () => {
    test('check empty cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[0][0].getPossibleMovements()).toHaveLength(0);
    });

    test('check not turn cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[1][0].getPossibleMovements()).toHaveLength(0);
    });

    test('check not available move cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[7][0].getPossibleMovements()).toHaveLength(0);
    });

    test('check the possible movements', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[5][0].getPossibleMovements()).toHaveLength(1);
    });
  });

  describe('isTurn: check the cell is current player', () => {
    test('check empty cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[0][0].isTurn()).toEqual(false);
    });

    test('check opponent player turn', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[1][0].isTurn()).toEqual(false);
    });

    test('check current player turn', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      expect(gameBoard.cells[5][0].isTurn()).toEqual(true);
    });
  });

  test('isEmpty: check the cell is empty or not', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    expect(gameBoard.cells[0][0].isEmpty()).toEqual(true);
    expect(gameBoard.cells[1][0].isEmpty()).toEqual(false);
  });

  test('isBlue: check the cell is blue player', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    expect(gameBoard.cells[0][0].isBlue()).toEqual(false);
    expect(gameBoard.cells[1][0].isBlue()).toEqual(true);
    expect(gameBoard.cells[5][0].isBlue()).toEqual(false);
  });

  test('isRed: check the cell is red player', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    expect(gameBoard.cells[0][0].isRed()).toEqual(false);
    expect(gameBoard.cells[1][0].isRed()).toEqual(false);
    expect(gameBoard.cells[5][0].isRed()).toEqual(true);
  });

  test('isEnemy: check the cell is opponent player', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    expect(gameBoard.cells[0][0].isEmeny(gameBoard.cells[0][0])).toEqual(false);
    expect(gameBoard.cells[0][0].isEmeny(gameBoard.cells[1][0])).toEqual(false);
    expect(gameBoard.cells[0][0].isEmeny(gameBoard.cells[5][0])).toEqual(false);

    expect(gameBoard.cells[1][0].isEmeny(gameBoard.cells[0][0])).toEqual(false);
    expect(gameBoard.cells[1][0].isEmeny(gameBoard.cells[1][0])).toEqual(false);
    expect(gameBoard.cells[1][0].isEmeny(gameBoard.cells[5][0])).toEqual(true);

    expect(gameBoard.cells[5][0].isEmeny(gameBoard.cells[0][0])).toEqual(false);
    expect(gameBoard.cells[5][0].isEmeny(gameBoard.cells[1][0])).toEqual(true);
    expect(gameBoard.cells[5][0].isEmeny(gameBoard.cells[5][0])).toEqual(false);
  });

  test('isKing: check the cell is king checker', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    expect(gameBoard.cells[0][0].isKing()).toEqual(false);
    expect(gameBoard.cells[1][0].isKing()).toEqual(false);
    expect(gameBoard.cells[5][0].isKing()).toEqual(false);

    gameBoard.cells[0][0].state = BoardCellState.BLUE_KING_CHECKER;
    expect(gameBoard.cells[0][0].isKing()).toEqual(true);

    gameBoard.cells[0][0].state = BoardCellState.RED_KING_CHECKER;
    expect(gameBoard.cells[0][0].isKing()).toEqual(true);
  });

  describe('move: move the checker', () => {
    test('move empty cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      expect(
        gameBoard.cells[0][0].move({
          row: 1,
          col: 0,
        })
      ).toEqual(false);
    });

    test('move not available cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      expect(
        gameBoard.cells[1][0].move({
          row: 2,
          col: 1,
        })
      ).toEqual(false);
    });

    test('move cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      gameBoard.cells[5][2].move({
        row: 4,
        col: 3,
      });
      expect(gameBoard.cells[5][2].state).toEqual(BoardCellState.EMPTY);
      expect(gameBoard.cells[4][3].state).toEqual(BoardCellState.RED_CHECKER);
    });

    test('move cell by capturying opponent checker', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      gameBoard.cells[5][2].state = BoardCellState.EMPTY;
      gameBoard.cells[4][3].state = BoardCellState.RED_CHECKER;
      gameBoard.cells[3][2].state = BoardCellState.BLUE_CHECKER;
      gameBoard.cells[2][1].state = BoardCellState.EMPTY;

      gameBoard.cells[4][3].move({
        row: 2,
        col: 1,
      });
      expect(gameBoard.cells[4][3].state).toEqual(BoardCellState.EMPTY);
      expect(gameBoard.cells[3][2].state).toEqual(BoardCellState.EMPTY);
      expect(gameBoard.cells[2][1].state).toEqual(BoardCellState.RED_CHECKER);
    });
  });

  describe('makeKing: check and make the checker as king', () => {
    test('empty cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      gameBoard.cells[0][0].makeKing();
      expect(gameBoard.cells[0][0].isKing()).toEqual(false);
    });

    test('not king cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      gameBoard.cells[1][0].makeKing();
      expect(gameBoard.cells[1][0].isKing()).toEqual(false);
    });

    test('empty cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      gameBoard.cells[0][0].state = BoardCellState.RED_CHECKER;

      gameBoard.cells[0][0].makeKing();
      expect(gameBoard.cells[0][0].isKing()).toEqual(true);
    });
  });
});
