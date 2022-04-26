import React, { useState } from 'react';
import DeleteIcon from '../../Main/icons/Delete.svg';
import classes from './Delete.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  remove: () => void;
  removeAll: () => void;
}

export const Delete: React.FC<ButtonProps> = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className={classes.position}>
      <button
        onClick={() => {
          setShow(!show);
        }}
        className={classes.button}
        style={props.style}
      >
        <DeleteIcon className={show ? classes.redColor : classes.whiteColor} />
      </button>
      {show && (
        <div className={classes.buttons}>
          <button
            className={classes.buttonDelete}
            onClick={() => {
              props.remove();
              setShow(!show);
            }}
          >
            Удалить отмеченные
          </button>
          <button
            className={classes.buttonDelete}
            onClick={() => {
              props.removeAll();
              setShow(!show);
            }}
          >
            Удалить все
          </button>
        </div>
      )}
    </div>
  );
};
