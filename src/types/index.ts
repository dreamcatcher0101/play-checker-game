import { GamePlayer } from 'consts';

export type CheckerPosition = {
  row: number;
  col: number;
};

export interface PlayTime {
  [GamePlayer.BLUE]: number;
  [GamePlayer.RED]: number;
}
