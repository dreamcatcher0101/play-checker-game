import { BoardCellState } from 'consts';
import React, { useContext, DragEvent } from 'react';
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
  const { boardState, moveChecker } = useContext(BoardContext);

  const handleDragStart = (event: DragEvent<HTMLTableCellElement>) => {
    event.dataTransfer.setData('row', position.row.toString());
    event.dataTransfer.setData('col', position.col.toString());
  };

  const enableDropping = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLTableCellElement>) => {
    const row = Number(event.dataTransfer.getData('row'));
    const col = Number(event.dataTransfer.getData('col'));
    const fromPosition: CheckerPosition = { row, col };
    console.log('Dragged from', fromPosition, 'to', position);
    moveChecker(fromPosition, position);
  };

  return (
    <td
      className={`board-cell__container cell-${type} ${
        boardState[position.row][position.col] === BoardCellState.BLUE_CHECKER
          ? 'draggable'
          : boardState[position.row][position.col] ===
            BoardCellState.RED_CHECKER
          ? 'draggable'
          : 'not-draggable'
      }`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={enableDropping}
      onDrop={handleDrop}
    >
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
