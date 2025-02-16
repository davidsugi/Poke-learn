import React, { createContext, useContext, useState, ReactNode, JSX } from 'react';
import Modal from '../Modal';

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (content:JSX.Element, title:string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalWrapperProps {
  children: ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState<JSX.Element>(<></>)
  const [title, setTitle] = useState<string>("")

  const openModal = (content:JSX.Element, title:string) => {
    setContent(content)
    setTitle(title)
    setModalOpen(true);
  }
  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        {content}
       </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalWrapper');
  }
  return context;
};
