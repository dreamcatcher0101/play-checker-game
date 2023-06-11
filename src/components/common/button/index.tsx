import React from 'react';
import './style.css';

interface ButtonProps {
  children: React.ReactNode;
  filled?: boolean;
  secondary?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  filled,
  secondary,
  onClick,
}: ButtonProps) => {
  return (
    <div
      className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${
        filled ? 'dir-control--filled' : ''
      }`}
      onClick={onClick}
    >
      {children}
      <span />
      <span />
      <span />
      <span />
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
    </div>
  );
};
