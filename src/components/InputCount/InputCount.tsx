import React from 'react';
import classes from './input.module.css';

interface InputCountProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputCount: React.FC<InputCountProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(Number(e.currentTarget.value));
  };

  return (
    <input
      className={classes.background}
      type="number"
      placeholder="Количество"
      value={value}
      onChange={handleChange}
    />
  );
};
