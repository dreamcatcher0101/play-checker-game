import { GamePlayer } from 'consts';
import React, { useContext } from 'react';
import './style.css';
import { BoardContext } from 'contexts';
import { convertCheckerPositionToString } from 'utils';

export const HistoryPanelComponent: React.FC = () => {
  const { board } = useContext(BoardContext);

  return (
    <div className="history-panel__container">
      <span>History</span>
      <ul className="history-panel">
        {board.movementHistory.map((movement, index) => (
          <li key={index} className="history-record">
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
    </div>
  );
};
