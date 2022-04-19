import React from 'react';
import classes from './input.module.css';

interface InputTotalPriceProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputTotalPrice: React.FC<InputTotalPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(Number(e.currentTarget.value));
  };

  return <input className={classes.background} readOnly value={value} onChange={handleChange} required />;
};
