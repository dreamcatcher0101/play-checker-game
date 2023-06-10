import React from 'react';
import './style.css';

interface ButtonProps {
  as?: React.ElementType;
  children: React.ReactNode;
  filled?: boolean;
  secondary?: boolean;
  role?: string;
  onClick?: () => void;
}

export const Button = ({
  as: Component = 'button',
  children,
  filled,
  secondary,
  role,
  onClick,
}: ButtonProps) => {
  return (
    <Component
      className={`dir-control ${secondary ? 'dir-control--secondary' : ''} ${
        filled ? 'dir-control--filled' : ''
      }`}
      role={role}
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
    </Component>
  );
};
