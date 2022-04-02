import React from 'react';

interface InputDataProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputData: React.FC<InputDataProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input type={'date'} value={value} onChange={handleChange} />;
};
