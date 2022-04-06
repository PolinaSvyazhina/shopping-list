import React from 'react';
import { CheckSvg } from '../../images/CheckSvg';
import classes from './ButtonSelect.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  isChecked: boolean;
}

export const ButtonSelect: React.FC<ButtonProps> = (props) => {
  const { isChecked, ...rest } = props;
  return (
    <button className={classes.button} {...rest}>
      <CheckSvg color={isChecked ? '#5D9DFF' : '#EFF4FA'} />
    </button>
  );
};
