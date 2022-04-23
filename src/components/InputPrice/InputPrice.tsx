import React from 'react';
import classes from './input.module.css';
import style from '../InputBaseStyle/input.module.css';

interface InputPriceProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputPrice: React.FC<InputPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(Number(e.currentTarget.value));
  };

  return (
    <input
      className={classes.background + ' ' + style.input}
      type="number"
      placeholder="Цена"
      value={value}
      onChange={handleChange}
    />
  );
};
