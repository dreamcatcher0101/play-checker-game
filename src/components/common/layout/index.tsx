import React from 'react';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import './style.css';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout__container">
      <HeaderComponent />
      {children}
      <FooterComponent />
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
