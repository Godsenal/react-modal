import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import shortid from 'shortid';
import Modal from './Modal';
import ModalContext from './context';
import { ModalConfig } from './typing';
import { canUseDOM } from './utils';
import invariant from './invariant';
import './modal.css';

const NODE_ID = '__react-modal';
const modalDefaultConfig = {
  maxWidth: 'sm',
  dimmed: 0.5,
} as const;

const ModalPortal: React.FC = ({ children }) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [modals, setModals] = useState<ModalConfig[]>([]);

  useEffect(() => {
    // portal node 설정
    if (canUseDOM) {
      const el = document.createElement('div');
      el.id = NODE_ID;
      document.body.appendChild(el);
      setNode(el);
    }
  }, []);

  const showModal = useCallback(
    (
      modalCallback: (id: string) => React.ReactNode,
      modalConfig?: Partial<ModalConfig>,
    ) => {
      const id = shortid.generate();
      const node = modalCallback(id);
      const config = {
        ...modalDefaultConfig,
        ...modalConfig,
      } as const;

      invariant.dimmed(config.dimmed);
      invariant.maxWidth(config.maxWidth);

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
    <>
      <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
      {node &&
        createPortal(
          <>
            {modals.map(modal => (
              <Modal key={modal.id} {...modal} />
            ))}
          </>,
          node,
        )}
    </>
  );
};

export default ModalPortal;
