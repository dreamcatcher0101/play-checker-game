import React from 'react';
import './style.css';
import { BoardCellComponent } from 'components/common';
import { GameBoard } from 'utils';

export const GameBoardComponent: React.FC = () => {
  const gameBoard = new GameBoard();

  return (
    <div className="game-board">
      <table className="game-board__container">
        <tbody className="game-board-content__container">
          {new Array(8).fill(0).map((_, rowIndex) => (
            <tr className="board-row__container" key={rowIndex}>
              {new Array(8).fill(0).map((_, colIndex) => (
                <BoardCellComponent
                  key={colIndex}
                  type={(rowIndex + colIndex) % 2 ? 'light' : 'dark'}
                  state={gameBoard.getState(rowIndex, colIndex)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
