import { GamePlayer } from 'consts';
import React from 'react';
import './style.css';

interface VictoryModalProps {
  player: GamePlayer;
}

export const VictoryModalComponent: React.FC<VictoryModalProps> = ({
  player,
}) => {
  return (
    <div className="victory-banner__container">
      {player === GamePlayer.RED ? 'Red' : 'Blue'}&nbsp;Player Wins!
    </div>
  );
};
