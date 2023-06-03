import React from 'react';
import './style.css';

interface BoardCellProps {
  type: 'dark' | 'light';
}

export const BoardCellComponent: React.FC<BoardCellProps> = ({ type }) => {
  return (
    <td className={`board-cell__container cell-${type}`}>
      <div className="board-cell__item"></div>
    </td>
  );
};
