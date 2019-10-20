import React, { useState, useEffect, useCallback, useMemo } from 'react';
import shortid from 'shortid';
import Modal from './Modal';
import ModalContext from './context';
import { ModalConfig } from './typing';
import './modal.css';

const ModalPortal: React.FC = ({ children }) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const showModal = useCallback(
    (
      modalCallback: (id: string) => React.ReactNode,
      modalConfig?: Partial<ModalConfig>,
    ) => {
      const id = shortid.generate();
      const node = modalCallback(id);
      const config = {
        ...modalConfig,
        maxWidth: 'sm',
        dimmed: 0.5,
      } as const;
      setModals(prev => [...prev, { ...config, id, node }]);
      return id;
    },
    [],
  );

  const closeModal = useCallback((id: string) => {
    setModals(prev => prev.filter(modal => modal.id !== id));
  }, []);

  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  }, [modals]);

  const context = useMemo(
    () => ({
      showModal,
      closeModal,
    }),
    [showModal, closeModal],
  );

  return (
    <ModalContext.Provider value={context}>
      {children}
      {modals.map(modal => (
        <Modal key={modal.id} {...modal} />
      ))}
    </ModalContext.Provider>
  );
};

export default ModalPortal;
