import React from 'react';

import classes from './Input.module.css';

interface InputProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input className={classes.input} value={value} onChange={handleChange} />;
};
