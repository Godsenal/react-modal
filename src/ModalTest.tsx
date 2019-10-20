import React from 'react';
import { useModal } from './Modal';

const buttonStyle = {
  width: '50%',
  padding: 20,
};
const InnerModal: React.FC<{
  id: string;
  context: ReturnType<typeof useModal>;
}> = ({ id, context }) => {
  const { showModal, closeModal } = context;
  return (
    <>
      <div>
        <div>
          <button
            style={buttonStyle}
            onClick={() =>
              showModal(anotherId => (
                <InnerModal id={anotherId} context={context} />
              ))
            }
          >
            open another modal
          </button>
          <button style={buttonStyle} onClick={() => closeModal(id)}>
            close
          </button>
        </div>
        <img
          src={`https://source.unsplash.com/random?sig=${id}`}
          alt="random"
        />
      </div>
    </>
  );
};

const ModalTest: React.FC = () => {
  const context = useModal();
  const handleClick = () => {
    context.showModal(id => <InnerModal id={id} context={context} />);
  };
  return <button onClick={handleClick}>showModal</button>;
};

export default ModalTest;
