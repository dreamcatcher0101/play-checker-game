import { GamePlayer } from 'consts';
import React, { useContext } from 'react';
import './style.css';
import { BoardContext } from 'contexts';
import { convertCheckerPositionToString } from 'utils/position';

export const HistoryPanelComponent: React.FC = () => {
  const { board } = useContext(BoardContext);

  return (
    <ul className="history-panel__container">
      {board.movementHistory.map((movement, index) => (
        <li key={index} className="record__container">
          <div>
            {movement.player === GamePlayer.BLUE
              ? 'Blue'
              : movement.player === GamePlayer.RED
              ? 'Red'
              : ''}
            &nbsp; ({convertCheckerPositionToString(movement.fromPosition)})
            &nbsp;&gt;&nbsp; (
            {convertCheckerPositionToString(movement.toPosition)})
          </div>
          {!!movement.capturedChecker.length &&
            movement.capturedChecker.map((capturedChecker, index) => (
              <div key={index}>
                Captured&nbsp;
                {convertCheckerPositionToString(capturedChecker.position)}
              </div>
            ))}
        </li>
      ))}
    </ul>
  );
};
