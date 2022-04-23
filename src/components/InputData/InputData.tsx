import React from 'react';
import classes from './input.module.css';
import style from '../InputBaseStyle/input.module.css';

interface InputDataProps {
  value?: string;
  onValueChange?: (value?: Date) => void;
}

export const InputData: React.FC<InputDataProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(new Date(e.currentTarget.value));
  };

  return (
    <input className={classes.background + ' ' + style.input} type={'date'} value={value} onChange={handleChange} />
  );
};
