import React, { useState } from 'react';
import DeleteIcon from '../../Main/icons/Delete.svg';
import classes from './Delete.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

export const Delete: React.FC<ButtonProps> = (props) => {
  const { ...rest } = props;
  const [show, setShow] = useState(false);
  const whiteColor = '#EFF4FA';
  const redColor = '#F46770';
  return (
    <div className={classes.position}>
      <button
        onClick={() => {
          setShow(!show);
        }}
        className={classes.button}
        {...rest}
      >
        <DeleteIcon color={show ? redColor : whiteColor} />
      </button>
      {show && (
        <div className={classes.buttons}>
          <button className={classes.buttonDelete}>Удалить отмеченные</button>
          <button className={classes.buttonDelete}>Удалить все</button>
        </div>
      )}
    </div>
  );
};
