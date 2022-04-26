import React from 'react';
import classes from './input.module.css';
import style from '../Input/Input.module.css';

interface InputPriceProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputPrice: React.FC<InputPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value !== '' ? Math.ceil(Number(e.currentTarget.value) * 100) / 100 : null);
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
