import { BoardCellState } from 'consts';
import React, { useContext } from 'react';
import { CheckerPosition } from 'types';
import './style.css';
import { BoardContext } from 'contexts/board';

interface BoardCellProps {
  type: 'dark' | 'light';
  position: CheckerPosition;
}

export const BoardCellComponent: React.FC<BoardCellProps> = ({
  type,
  position,
}) => {
  const { boardState } = useContext(BoardContext);

  return (
    <td className={`board-cell__container cell-${type}`}>
      <div
        className={`board-cell__item ${
          boardState[position.row][position.col] === BoardCellState.BLUE_CHECKER
            ? 'cell-blue'
            : boardState[position.row][position.col] ===
              BoardCellState.RED_CHECKER
            ? 'cell-red'
            : ''
        }`}
      ></div>
    </td>
  );
};
