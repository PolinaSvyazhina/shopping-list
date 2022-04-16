import React, { ReactElement, useEffect } from 'react';
import classes from './modal.module.css';

interface ModalProps {
  visible: boolean;
  title: ReactElement | string;
  content: ReactElement | string;
  footer: ReactElement | string;
  onClose: () => void;
}

export const Modal = ({ visible = false, title = '', content = '', footer = '', onClose }: ModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) return null;

  return (
    <div className={classes.modal} onClick={onClose}>
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h3 className={classes.title}>{title}</h3>
          <span className={classes.close} onClick={onClose}></span>
        </div>
        <div className={classes.body}>
          <div className={classes.content}>{content}</div>
        </div>
        {footer && <div className={classes.footer}>{footer}</div>}
      </div>
    </div>
  );
};
