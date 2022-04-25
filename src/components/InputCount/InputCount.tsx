import React from 'react';
import classes from './input.module.css';
import style from '../InputBaseStyle/input.module.css';

interface InputCountProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputCount: React.FC<InputCountProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value !== '' ? Number(e.currentTarget.value) : null);
  };

  return (
    <input
      className={classes.background + ' ' + style.input}
      type="number"
      placeholder="Количество"
      value={value}
      onChange={handleChange}
    />
  );
};
