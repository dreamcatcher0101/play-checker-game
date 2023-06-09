import { GamePlayer } from 'consts';
import React, { useContext, useEffect, useState } from 'react';
import { PlayTime } from 'types';
import './style.css';
import { BoardContext } from 'contexts';
import { convertPlayTimeToString } from 'utils';

export const PlayTimePanelComponent: React.FC = () => {
  const [playTime, setPlayTime] = useState<PlayTime>({
    [GamePlayer.BLUE]: 0,
    [GamePlayer.RED]: 0,
  });
  const { board } = useContext(BoardContext);

  const handleTimeInterval = () => {
    setPlayTime((playTime) => {
      return {
        ...playTime,
        [board.player]: playTime[board.player] + 1,
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(handleTimeInterval, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setPlayTime({
      [GamePlayer.BLUE]: 0,
      [GamePlayer.RED]: 0,
    });
  }, [board.isFinished]);

  return (
    <div className="play-time-panel">
      <div className="play-time-name">Game Status</div>
      <div
        className={`blue-time-box play-time-box ${
          board.player === GamePlayer.BLUE
            ? 'time-box-focused'
            : 'time-box-not-focused'
        }`}
      >
        <div>
          <span className="blue-time-title play-time-title">BLUE:</span>
          <span className="play-time">{`${convertPlayTimeToString(
            playTime[GamePlayer.BLUE]
          )}`}</span>
        </div>
        <div>Soldier: 7</div>
        <div>King: 1</div>
      </div>
      <div
        className={`red-time-box play-time-box ${
          board.player === GamePlayer.RED
            ? 'time-box-focused'
            : 'time-box-not-focused'
        }`}
      >
        <div>
          <span className="red-time-title play-time-title">RED:</span>{' '}
          <span className="play-time">{`${convertPlayTimeToString(
            playTime[GamePlayer.RED]
          )}`}</span>
        </div>
      </div>
    </div>
  );
};
