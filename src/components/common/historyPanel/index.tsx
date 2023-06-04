import React from 'react';
import './style.css';

export const HistoryPanelComponent: React.FC = () => {
  return (
    <ul className="history-panel__container">
      <li className="record__container">First</li>
      <li className="record__container">Second</li>
      <li className="record__container">Third</li>
    </ul>
  );
};
