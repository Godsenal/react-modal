import React from 'react';
import ModalPortal from 'react-modal/lib';
import ModalTest from './ModalTest';
import './index.css';

const App: React.FC = () => {
  return (
    <>
      <ModalPortal>
        <ModalTest />
      </ModalPortal>
    </>
  );
};

export default App;
