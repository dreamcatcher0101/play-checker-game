import { BoardCellState } from 'consts';
import React, { useMemo, useContext, DragEvent } from 'react';
import { CheckerPosition } from 'types';
import './style.css';
import { BoardContext } from 'contexts';
import { BoardCell } from 'utils';

interface BoardCellProps {
  cell: BoardCell;
}

export const BoardCellComponent: React.FC<BoardCellProps> = ({ cell }) => {
  const { board, highlightPositions, highlightedPositions, moveChecker } =
    useContext(BoardContext);

  const { type, state, isKing } = useMemo(() => {
    return {
      type: (cell.row + cell.col) % 2 ? 'light' : 'dark',
      state: cell.state,
      isKing: cell.isKing(),
    };
  }, [cell]);

  const isAvailableToMove = useMemo(() => {
    return board.isAvailableToMove({
      row: cell.row,
      col: cell.col,
    });
  }, [board]);

  const isPossibleMovePosition = useMemo(() => {
    return !!highlightedPositions.filter(
      (position) => position.row === cell.row && position.col === cell.col
    ).length;
  }, [highlightedPositions]);

  const handleDragStart = (event: DragEvent<HTMLTableCellElement>) => {
    event.dataTransfer.setData('row', cell.row.toString());
    event.dataTransfer.setData('col', cell.col.toString());
  };

  const enableDropping = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLTableCellElement>) => {
    const row = Number(event.dataTransfer.getData('row'));
    const col = Number(event.dataTransfer.getData('col'));
    const fromPosition: CheckerPosition = { row, col };
    const toPosition: CheckerPosition = { row: cell.row, col: cell.col };
    moveChecker(fromPosition, toPosition);
  };

  const handleMouseOver = () => {
    highlightPositions({ row: cell.row, col: cell.col });
  };

  return (
    <div
      className={`board-cell__container cell-${type}`}
      onDrop={handleDrop}
      onDragOver={enableDropping}
    >
      <div
        draggable={isAvailableToMove}
        onDragStart={handleDragStart}
        onMouseOver={handleMouseOver}
        className={`board-cell__item ${
          state === BoardCellState.BLUE_CHECKER ||
          state === BoardCellState.BLUE_KING_CHECKER
            ? 'cell-blue'
            : state === BoardCellState.RED_CHECKER ||
              state === BoardCellState.RED_KING_CHECKER
            ? 'cell-red'
            : ''
        } ${isAvailableToMove ? 'draggable' : 'not-draggable'} ${
          isPossibleMovePosition ? 'available-position__item' : ''
        }`}
      >
        {isKing && 'KING'}
      </div>
    </div>
  );
};
