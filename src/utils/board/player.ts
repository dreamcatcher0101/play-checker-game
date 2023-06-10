import { GamePlayer } from 'consts';
import { CheckerPosition } from 'types';
import { GameBoard } from './board';

/**
 * Get next player
 * @param player Current player
 * @returns Next player
 */
export const getNextPlayer = (player: GamePlayer) => {
  return 3 - player;
};

/**
 * Get the AI player's next checker movement
 * @param board Game board class instance
 * @returns Movement from position and to position
 */
export const getAIPlayerCheckerMovement = (
  board: GameBoard
): {
  fromPosition: CheckerPosition;
  toPosition: CheckerPosition;
} | null => {
  const availableMovementPositions: {
    fromPosition: CheckerPosition;
    toPosition: CheckerPosition;
  }[] = [];

  board.cells.forEach((cellRow) =>
    cellRow.forEach((cell) => {
      if (
        board.isAvailableToMove({
          row: cell.row,
          col: cell.col,
        })
      ) {
        cell.getPossibleMovements().forEach((position) => {
          availableMovementPositions.push({
            fromPosition: {
              row: cell.row,
              col: cell.col,
            },
            toPosition: position,
          });
        });
      }
    })
  );

  const length = availableMovementPositions.length;
  if (!length) {
    return null;
  }

  const randomIndex = Math.round(Math.random() * 100000) % length;
  return availableMovementPositions[randomIndex];
};
