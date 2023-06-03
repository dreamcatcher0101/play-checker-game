import React from 'react';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      Layout
      {children}
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
        <HeaderComponent />
        <WrappedComponent {...props} />
        <FooterComponent />
      </LayoutComponent>
    );
  };
};
