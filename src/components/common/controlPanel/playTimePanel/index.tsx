import { GamePlayer } from 'consts';
import React, { useContext, useEffect } from 'react';
import './style.css';
import { BoardContext } from 'contexts';
import { convertPlayTimeToString } from 'utils';

export const PlayTimePanelComponent: React.FC = () => {
  const { playTime, board, increasePlayerTime } = useContext(BoardContext);

  const handleTimeInterval = () => {
    increasePlayerTime();
  };

  useEffect(() => {
    const interval = setInterval(handleTimeInterval, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="play-time-panel">
      <div className="play-time-name">Play Time</div>
      <div
        className={`blue-time-box play-time-box ${
          board.player === GamePlayer.BLUE
            ? 'time-box-focused'
            : 'time-box-not-focused'
        }`}
      >
        <span className="blue-time-title play-time-title">BLUE:</span>
        <span className="play-time">{`${convertPlayTimeToString(
          playTime[GamePlayer.BLUE]
        )}`}</span>
      </div>
      <div
        className={`red-time-box play-time-box ${
          board.player === GamePlayer.RED
            ? 'time-box-focused'
            : 'time-box-not-focused'
        }`}
      >
        <span className="red-time-title play-time-title">RED:</span>{' '}
        <span className="play-time">{`${convertPlayTimeToString(
          playTime[GamePlayer.RED]
        )}`}</span>
      </div>
    </div>
  );
};
