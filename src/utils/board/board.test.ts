import { BoardCellState, BoardSize, GamePlayer } from 'consts';
import { GameBoard } from './board';

describe('Check game board', () => {
  describe('constructor: game board initialization', () => {
    test('Initialize with small board size', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      expect(gameBoard.boardSize).toEqual(BoardSize.SMALL);
      expect(gameBoard.cells.length).toEqual(BoardSize.SMALL);
      expect(gameBoard.cells[0].length).toEqual(BoardSize.SMALL);
    });

    test('Initialize with medium board size', () => {
      const gameBoard = new GameBoard(BoardSize.MEDIUM);

      expect(gameBoard.boardSize).toEqual(BoardSize.MEDIUM);
      expect(gameBoard.cells.length).toEqual(BoardSize.MEDIUM);
      expect(gameBoard.cells[0].length).toEqual(BoardSize.MEDIUM);
    });

    test('Initialize with large board size', () => {
      const gameBoard = new GameBoard(BoardSize.LARGE);

      expect(gameBoard.boardSize).toEqual(BoardSize.LARGE);
      expect(gameBoard.cells.length).toEqual(BoardSize.LARGE);
      expect(gameBoard.cells[0].length).toEqual(BoardSize.LARGE);
    });
  });

  describe('getCell: get cell', () => {
    test('Get empty cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      const cell = gameBoard.getCell({
        row: 0,
        col: 0,
      });

      expect(cell.state).toEqual(BoardCellState.EMPTY);
    });

    test('Get blue cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      const cell = gameBoard.getCell({
        row: 1,
        col: 0,
      });

      expect(cell.state).toEqual(BoardCellState.BLUE_CHECKER);
    });

    test('Get red cell', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      const cell = gameBoard.getCell({
        row: 7,
        col: 0,
      });

      expect(cell.state).toEqual(BoardCellState.RED_CHECKER);
    });
  });

  describe('getNewBoard: get new board', () => {
    test('Get new board', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);
      const newGameBoard = gameBoard.getNewBoard();

      expect(gameBoard.boardSize).toEqual(newGameBoard.boardSize);
      expect(
        gameBoard.cells.map((cellRow) =>
          cellRow.map((cell) => ({
            row: cell.row,
            col: cell.col,
            state: cell.state,
          }))
        )
      ).toEqual(
        newGameBoard.cells.map((cellRow) =>
          cellRow.map((cell) => ({
            row: cell.row,
            col: cell.col,
            state: cell.state,
          }))
        )
      );
      expect(gameBoard.player).toEqual(newGameBoard.player);
      expect(gameBoard.numberOfMoves).toEqual(newGameBoard.numberOfMoves);
      expect(gameBoard.movementHistory).toEqual(newGameBoard.movementHistory);
      expect(gameBoard.isFinished).toEqual(newGameBoard.isFinished);
    });
  });

  describe('isAvailableToMove: check the move is valid or not', () => {
    describe('check the cell is available to move', () => {
      test('check the turn', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);

        expect(
          gameBoard.isAvailableToMove({
            row: 0,
            col: 1,
          })
        ).toEqual(false);
      });

      test('check unavailable move checker', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);

        expect(
          gameBoard.isAvailableToMove({
            row: 7,
            col: 0,
          })
        ).toEqual(false);
      });
    });

    describe('check the cell is available move', () => {
      test('check available to move', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);

        expect(
          gameBoard.isAvailableToMove({
            row: 5,
            col: 0,
          })
        ).toEqual(true);
      });

      test('check available normal movement to the position', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);

        expect(
          gameBoard.isAvailableToMove(
            {
              row: 5,
              col: 0,
            },
            {
              row: 4,
              col: 1,
            }
          )
        ).toEqual(true);
      });

      test('check available capture movement to the position', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);
        gameBoard.cells[5][2].state = BoardCellState.EMPTY;
        gameBoard.cells[4][3].state = BoardCellState.RED_CHECKER;
        gameBoard.cells[3][2].state = BoardCellState.BLUE_CHECKER;
        gameBoard.cells[2][1].state = BoardCellState.EMPTY;

        expect(
          gameBoard.isAvailableToMove(
            {
              row: 4,
              col: 3,
            },
            {
              row: 2,
              col: 1,
            }
          )
        ).toEqual(true);
      });
    });
  });

  test('changeTurn: change the player turn', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    expect(gameBoard.player).toEqual(GamePlayer.RED);
    gameBoard.changeTurn();
    expect(gameBoard.player).toEqual(GamePlayer.BLUE);
    gameBoard.changeTurn();
    expect(gameBoard.player).toEqual(GamePlayer.RED);
  });

  test('addHistory: add movement history', () => {
    const gameBoard = new GameBoard(BoardSize.SMALL);

    gameBoard.addHistory({
      player: gameBoard.player,
      state: gameBoard.getCell({
        row: 5,
        col: 0,
      }).state,
      fromPosition: {
        row: 5,
        col: 0,
      },
      toPosition: {
        row: 4,
        col: 1,
      },
      capturedChecker: [],
    });
    expect(gameBoard.movementHistory).toHaveLength(1);
  });

  describe('revertLastMove: add movement history', () => {
    test('revert the last one move and left no history', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      gameBoard.addHistory({
        player: gameBoard.player,
        state: gameBoard.getCell({
          row: 5,
          col: 0,
        }).state,
        fromPosition: {
          row: 5,
          col: 0,
        },
        toPosition: {
          row: 4,
          col: 1,
        },
        capturedChecker: [],
      });
      gameBoard.revertLastMove();
      expect(gameBoard.movementHistory).toHaveLength(0);
    });

    test('revert the last two move', () => {
      const gameBoard = new GameBoard(BoardSize.SMALL);

      gameBoard.cells[5][2].move({
        row: 4,
        col: 3,
      });
      gameBoard.cells[2][1].move({
        row: 3,
        col: 2,
      });
      gameBoard.cells[4][3].move({
        row: 2,
        col: 1,
      });
      gameBoard.revertLastMove();
      expect(gameBoard.movementHistory).toHaveLength(1);
    });

    describe('updateCells: update the board cell status', () => {
      test('check the king checker status after update', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);

        gameBoard.cells[0][0].state = BoardCellState.RED_CHECKER;
        gameBoard.updateCells();
        expect(gameBoard.cells[0][0].isKing()).toEqual(true);
      });

      test('check the game finished status', () => {
        const gameBoard = new GameBoard(BoardSize.SMALL);

        expect(gameBoard.isFinished).toEqual(null);
        gameBoard.cells[0][0].state = BoardCellState.RED_CHECKER;
        gameBoard.cells.forEach((cellRow) =>
          cellRow.forEach((cell) => {
            if (cell.isBlue()) {
              cell.state = BoardCellState.EMPTY;
            }
          })
        );
        gameBoard.updateCells();
        expect(gameBoard.isFinished).toEqual(GamePlayer.RED);
      });
    });
  });
});
