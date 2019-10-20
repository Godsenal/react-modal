import { createContext } from 'react';
import { ModalConfig } from './typing';

type ContextType = {
  showModal: (
    callback: (id: string) => React.ReactNode,
    config?: Partial<ModalConfig>,
  ) => string;
  closeModal: (id: string) => void;
};

const context = createContext<ContextType>({
  showModal: _ => '',
  closeModal: _ => {},
});

export default context;
