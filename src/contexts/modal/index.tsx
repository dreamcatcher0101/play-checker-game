import React, { useState } from 'react';
import './style.css';

interface ModalContextProviderProps {
  children: React.ReactNode;
}

interface ModalContextType {
  open: (data: React.ReactNode, options: ModalOptions) => void;
  close: () => void;
}

interface ModalOptions {
  isClosable?: boolean;
  title: string;
}

const defaultModalOptions: Required<ModalOptions> = {
  isClosable: false,
  title: '',
};

export const ModalContext = React.createContext<ModalContextType>({
  open: () => {
    // Open modal
  },
  close: () => {
    // Close modal
  },
});

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<React.ReactNode>(<></>);
  const [modalOptions, setModalOptions] =
    useState<ModalOptions>(defaultModalOptions);

  const open = (
    data: React.ReactNode,
    options: ModalOptions = defaultModalOptions
  ) => {
    setComponent(data);
    setModalOptions(options);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}
      {isOpen && (
        <div className="modal">
          <div className="modal__container">
            <div className="modal-header__container">
              <div className="modal-header-title">{modalOptions.title}</div>
              {modalOptions.isClosable && (
                <div className="modal-header-close-button" onClick={close}>
                  &times;
                </div>
              )}
            </div>
            {component}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
