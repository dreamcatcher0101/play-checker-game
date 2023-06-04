import React from 'react';
import './style.css';

export const ControlPanelComponent: React.FC = () => {
  return (
    <div className="control-panel__container">
      <div className="control-button__container">New Game</div>
      <div className="control-button__container">Options</div>
      <div className="control-button__container">Revert</div>
    </div>
  );
};
