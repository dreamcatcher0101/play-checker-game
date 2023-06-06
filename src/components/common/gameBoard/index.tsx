import { GamePlayer } from 'consts';
import React, { useContext } from 'react';
import './style.css';
import { BoardCellComponent } from 'components/common';
import { BoardContext } from 'contexts';

export const GameBoardComponent: React.FC = () => {
  const { board } = useContext(BoardContext);

  return (
    <div className="game-board">
      <div className="player-turn__container">
        {board.player === GamePlayer.BLUE
          ? 'BLUE'
          : board.player === GamePlayer.RED
          ? 'RED'
          : ''}
        's turn!
      </div>
      <table className="game-board__container">
        <tbody className="game-board-content__container">
          {board.cells.map((rowCells, row) => (
            <tr key={row}>
              {rowCells.map((cell, col) => (
                <BoardCellComponent key={col} cell={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
