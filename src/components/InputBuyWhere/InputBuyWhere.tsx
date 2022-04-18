import React from 'react';
import classes from './input.module.css';

interface InputBuyWhereProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputBuyWhere: React.FC<InputBuyWhereProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input className={classes.background} placeholder="Место" value={value} onChange={handleChange} />;
};
