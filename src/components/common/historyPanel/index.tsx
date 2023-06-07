import { GamePlayer } from 'consts';
import React, { useContext } from 'react';
import './style.css';
import { BoardContext } from 'contexts';

export const HistoryPanelComponent: React.FC = () => {
  const { board } = useContext(BoardContext);

  return (
    <ul className="history-panel__container">
      {board.movementHistory.map((movement, index) => (
        <li key={index} className="record__container">
          {movement.player === GamePlayer.BLUE
            ? 'Blue'
            : movement.player === GamePlayer.RED
            ? 'Red'
            : ''}
          &nbsp;
          {`${movement.fromPosition.row} ${movement.fromPosition.col}`}
        </li>
      ))}
      {/* <li className="record__container">First</li>
      <li className="record__container">Second</li>
      <li className="record__container">Third</li> */}
    </ul>
  );
};
