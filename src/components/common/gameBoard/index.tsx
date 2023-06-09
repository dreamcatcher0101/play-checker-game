import { GamePlayer } from 'consts';
import React, { useContext, useEffect } from 'react';
import { VictoryModalComponent } from '../victoryModal';
import './style.css';
import { BoardCellComponent } from 'components/common';
import { BoardContext, ModalContext } from 'contexts';

export const GameBoardComponent: React.FC = () => {
  const { board, boardSize, startNewGame } = useContext(BoardContext);
  const modal = useContext(ModalContext);

  useEffect(() => {
    if (board.isFinished !== null) {
      modal.open(<VictoryModalComponent player={board.isFinished} />, {
        closeOnClick: true,
        onClose: () => {
          startNewGame();
        },
      });
    } else {
      modal.close();
    }
  }, [board.isFinished]);

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
        <thead>
          <tr>
            <th className="table-blank-item__container"></th>
            {new Array(boardSize).fill(0).map((_, index) => (
              <th className="th-title__container" key={index}>
                {String.fromCharCode('A'.charCodeAt(0) + index)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="game-board-content__container">
          {board.cells.map((rowCells, row) => (
            <tr key={row}>
              <td className="td-title__container">{row + 1}</td>
              {rowCells.map((cell, col) => (
                <td key={col}>
                  <BoardCellComponent key={col} cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {board.isFinished !== null && (
        <VictoryModalComponent player={board.isFinished} />
      )}
    </div>
  );
};
