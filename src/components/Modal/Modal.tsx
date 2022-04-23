import React, { ReactElement, useEffect } from 'react';
import classes from './modal.module.css';
import { observer } from 'mobx-react-lite';
import Cross from './icons/Cross.svg';

interface ModalProps {
  title: ReactElement | string;
  content: ReactElement | string;
  footer: ReactElement | string;
  onClose: () => void;
}

export const Modal = observer((props: ModalProps) => {
  useEffect(() => {
    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'Escape':
          props.onClose;
          break;
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div className={classes.modal} onClick={props.onClose}>
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h1 className={classes.title}>{props.title}</h1>
          <Cross onClick={props.onClose} />
        </div>
        <div className={classes.body}>
          <div className={classes.content}>{props.content}</div>
        </div>
        {props.footer && <div className={classes.footer}>{props.footer}</div>}
      </div>
    </div>
  );
});
