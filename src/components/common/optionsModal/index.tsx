import { BoardSize } from 'consts';
import React, { ChangeEvent, useContext, useState } from 'react';
import './style.css';
import { BoardContext } from 'contexts';

interface GameOptionsModalProps {
  handleConfirm: (boardSize: number) => void;
  handleCancel: () => void;
}

export const GameOptionsModalComponent: React.FC<GameOptionsModalProps> = ({
  handleConfirm: propsHandleConfirm,
  handleCancel,
}) => {
  const { board } = useContext(BoardContext);

  const [boardSize, setBoardSize] = useState(board.boardSize);

  const handleBoardSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBoardSize(Number(event.target.value));
  };

  const handleConfirm = () => {
    propsHandleConfirm(boardSize);
  };

  return (
    <div className="options-modal__container">
      <div className="options-modal-content__container">
        Board Size:&nbsp;
        <select onChange={handleBoardSizeChange} value={boardSize}>
          <option>{BoardSize.SMALL}</option>
          <option>{BoardSize.MEDIUM}</option>
          <option>{BoardSize.LARGE}</option>
        </select>
      </div>
      <div className="options-modal-operation-buttons__container">
        <button
          className="confirm-modal-button confirm-button"
          onClick={handleConfirm}
        >
          Save
        </button>
        <button
          className="confirm-modal-button cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
