import React from 'react';

interface InputReplacementProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputReplacement: React.FC<InputReplacementProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input placeholder="Что-то другое" value={value} onChange={handleChange} required />;
};