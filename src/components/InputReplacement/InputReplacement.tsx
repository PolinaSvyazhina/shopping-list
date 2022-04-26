import React from 'react';
import style from '../Input/Input.module.css';
import classes from './input.module.css';

interface InputReplacementProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputReplacement: React.FC<InputReplacementProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return (
    <input
      className={classes.background + ' ' + style.input}
      placeholder="Что-то другое"
      value={value}
      onChange={handleChange}
    />
  );
};
