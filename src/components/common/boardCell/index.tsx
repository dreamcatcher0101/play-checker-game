import { CellState } from 'consts';
import React from 'react';
import './style.css';

interface BoardCellProps {
  type: 'dark' | 'light';
  state: CellState;
}

export const BoardCellComponent: React.FC<BoardCellProps> = ({
  type,
  state,
}) => {
  return (
    <td className={`board-cell__container cell-${type}`}>
      <div
        className={`board-cell__item ${
          state === CellState.BLUE_CHECKER
            ? 'cell-blue'
            : state === CellState.RED_CHECKER
            ? 'cell-red'
            : ''
        }`}
      ></div>
    </td>
  );
};
