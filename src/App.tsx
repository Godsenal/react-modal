import React from 'react';
import ModalPortal from './Modal';
import ModalTest from './ModalTest';

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
