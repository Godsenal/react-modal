import React from 'react';
import { useModal } from 'react-modal/lib';
import { ModalConfig } from './Modal/typing';

const options: Partial<ModalConfig> = {
  dimmed: 0.5,
  useBodyScroll: false,
  maxWidth: 'sm',
};

const setOption = <T extends keyof ModalConfig>(
  option: T,
  value: typeof options[T],
) => (options[option] = value);

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
              showModal(
                anotherId => <InnerModal id={anotherId} context={context} />,
                options,
              )
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
    context.showModal(id => <InnerModal id={id} context={context} />, options);
  };
  return (
    <>
      <div
        style={{
          position: 'fixed',
          zIndex: 2000,
          top: 10,
          right: 30,
          padding: 20,
          background: 'white',
        }}
      >
        <div>
          <label htmlFor="dimmed">Dimmed 값(0~1)</label>
          <input
            id="dimmed"
            defaultValue={options.dimmed}
            onChange={e => setOption('dimmed', Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="maxWidth">maxWidth 값</label>
          <select
            id="maxWidth"
            defaultValue={options.maxWidth || ''}
            onChange={e =>
              setOption('maxWidth', (e.target.value ||
                false) as ModalConfig['maxWidth'])
            }
          >
            {['xs', 'sm', 'md', 'lg', 'xl', ''].map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="useBodyScroll">body 스크롤 적용</label>
          <input
            id="useBodyScroll"
            type="checkbox"
            defaultChecked={options.useBodyScroll}
            onChange={e => setOption('useBodyScroll', e.target.checked)}
          />
        </div>
      </div>
      <button onClick={handleClick}>showModal</button>
    </>
  );
};

export default ModalTest;
