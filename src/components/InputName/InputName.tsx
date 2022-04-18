import React from 'react';
import classes from './input.module.css';

interface InputNameProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputName: React.FC<InputNameProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input className={classes.background} placeholder="Название" value={value} onChange={handleChange} required />;
};
