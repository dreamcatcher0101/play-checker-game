import React from 'react';
import './style.css';

interface ConfirmModalProps {
  content: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export const ConfirmModalComponent: React.FC<ConfirmModalProps> = ({
  content,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <div className="confirm-modal__container">
      <div className="confirm-modal-content__container">{content}</div>
      <div className="confirm-modal-confirm-buttons__container">
        <button
          className="confirm-modal-button confirm-button"
          onClick={handleConfirm}
        >
          Yes
        </button>
        <button
          className="confirm-modal-button cancel-button"
          onClick={handleCancel}
        >
          No
        </button>
      </div>
    </div>
  );
};
