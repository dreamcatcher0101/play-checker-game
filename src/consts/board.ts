import { GamePlayer } from './player';

export const KING_CHECKER_MULTIPLE_TIMES = 10;

export enum BoardCellState {
  EMPTY = 0,
  BLUE_CHECKER = GamePlayer.BLUE,
  RED_CHECKER = GamePlayer.RED,
  BLUE_KING_CHECKER = GamePlayer.BLUE * KING_CHECKER_MULTIPLE_TIMES,
  RED_KING_CHECKER = GamePlayer.RED * KING_CHECKER_MULTIPLE_TIMES,
}
