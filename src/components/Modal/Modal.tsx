import React, { ReactElement, useEffect } from 'react';
import classes from './modal.module.css';
import { observer } from 'mobx-react-lite';

interface ModalProps {
  visible: boolean;
  title: ReactElement | string;
  content: ReactElement | string;
  footer: ReactElement | string;
  onClose: () => void;
}

export const Modal = observer((props: ModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        props.onClose;
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!props.visible) return null;

  return (
    <div className={classes.modal} onClick={props.onClose}>
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h1 className={classes.title}>{props.title}</h1>
          <button className={classes.close} onClick={props.onClose}>
            {' '}
            крести{' '}
          </button>
        </div>
        <div className={classes.body}>
          <div className={classes.content}>{props.content}</div>
        </div>
        {props.footer && <div className={classes.footer}>{props.footer}</div>}
      </div>
    </div>
  );
});
