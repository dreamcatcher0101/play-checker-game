import React from 'react';
import './style.css';
import { BoardCellComponent } from 'components/common';

export const GameBoardComponent: React.FC = () => {
  return (
    <div className="game-board">
      <table className="game-board__container">
        <tbody className="game-board-content__container">
          {new Array(8).fill(0).map((_, row) => (
            <tr className="board-row__container" key={row}>
              {new Array(8).fill(0).map((_, col) => (
                <BoardCellComponent
                  key={col}
                  type={(row + col) % 2 ? 'light' : 'dark'}
                  position={{
                    row,
                    col,
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
