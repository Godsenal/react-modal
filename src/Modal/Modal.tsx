import React, { memo } from 'react';
import { ModalConfig } from './typing';

const Modal: React.FC<ModalConfig> = ({ node, maxWidth, dimmed }) => {
  const modalClassName = maxWidth ? `modal-${maxWidth}` : '';
  const dimmedRatio = dimmed >= 1 ? 1 : dimmed <= 0 ? 0 : dimmed;
  return (
    <div
      className="dimmed"
      style={{ backgroundColor: `rgba(0, 0, 0, ${dimmedRatio})` }}
    >
      <div className="center">
        <div className={`modal ${modalClassName}`}>{node}</div>
      </div>
    </div>
  );
};

export default memo(Modal);
