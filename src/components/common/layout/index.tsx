import React from 'react';
import { HeaderComponent } from '../header';
import './style.css';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout__container">
      <HeaderComponent />
      <div className="layout-content__container">{children}</div>
    </div>
  );
};

export const withLayout = <T extends object>(
  // eslint-disable-next-line
  WrappedComponent: React.ComponentType<T>
) => {
  return function WithLayout(props: T) {
    return (
      <LayoutComponent>
        <WrappedComponent {...props} />
      </LayoutComponent>
    );
  };
};
