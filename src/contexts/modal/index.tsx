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
  title?: string;
  closeOnClick?: boolean;
  onClose?: () => void;
}

const defaultModalOptions: Required<ModalOptions> = {
  isClosable: false,
  title: '',
  closeOnClick: false,
  onClose: () => {
    // Triggered when the modal is closed
  },
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
    if (modalOptions.onClose) {
      modalOptions.onClose();
    }
  };

  const handleModalClick = () => {
    if (modalOptions.closeOnClick) {
      setIsOpen(false);
      if (modalOptions.onClose) {
        modalOptions.onClose();
      }
    }
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
        <div className="modal" onClick={handleModalClick}>
          <div className="modal__container">
            {!!modalOptions.title && (
              <div className="modal-header__container">
                <div className="modal-header-title">{modalOptions.title}</div>
                {modalOptions.isClosable && (
                  <div className="modal-header-close-button" onClick={close}>
                    &times;
                  </div>
                )}
              </div>
            )}
            {component}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
