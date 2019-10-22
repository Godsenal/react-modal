import React, { memo, useMemo } from 'react';
import { ModalConfig } from './typing';

const Modal: React.FC<ModalConfig> = ({
  node,
  maxWidth,
  dimmed,
  useBodyScroll,
}) => {
  const centerClassName = useMemo(
    () => `center-scroll${useBodyScroll ? 'Body' : 'Modal'}`,
    [useBodyScroll],
  );
  const modalClassName = useMemo(() => (maxWidth ? `modal-${maxWidth}` : ''), [
    maxWidth,
  ]);

  return (
    <div
      className="dimmed"
      style={{ backgroundColor: `rgba(0, 0, 0, ${dimmed})` }}
    >
      <div className={`center ${centerClassName}`}>
        <div className={`modal ${modalClassName}`}>{node}</div>
      </div>
    </div>
  );
};

export default memo(Modal);
