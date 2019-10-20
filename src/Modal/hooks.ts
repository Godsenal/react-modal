import { useContext } from 'react';
import Context from './context';

export const useModal = () => {
  const { showModal, closeModal } = useContext(Context);

  return { showModal, closeModal };
};
