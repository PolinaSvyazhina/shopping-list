import React from 'react';
import classes from './input.module.css';
import style from '../InputBaseStyle/input.module.css';

interface InputTotalPriceProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputTotalPrice: React.FC<InputTotalPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value !== '' ? Math.ceil(Number(e.currentTarget.value) * 100) / 100 : null);
  };

  return (
    <input
      className={classes.background + ' ' + style.input}
      type="number"
      placeholder="Примерная цена"
      value={value}
      onChange={handleChange}
    />
  );
};
