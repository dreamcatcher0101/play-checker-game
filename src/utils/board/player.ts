import { GamePlayer } from 'consts';

export const getNextPLayer = (player: GamePlayer) => {
  return 3 - player;
};
