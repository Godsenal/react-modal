import React, { memo, useMemo } from 'react';
import { ModalConfig } from './typing';

const Modal: React.FC<ModalConfig> = ({ node, maxWidth, dimmed }) => {
  const modalClassName = useMemo(() => (maxWidth ? `modal-${maxWidth}` : ''), [
    maxWidth,
  ]);

  return (
    <div
      className="dimmed"
      style={{ backgroundColor: `rgba(0, 0, 0, ${dimmed})` }}
    >
      <div className="center">
        <div className={`modal ${modalClassName}`}>{node}</div>
      </div>
    </div>
  );
};

export default memo(Modal);
