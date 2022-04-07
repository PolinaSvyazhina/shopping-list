import React from 'react';

interface InputDataProps {
  value?: Date;
  onValueChange?: (value?: Date) => void;
}

export const InputData: React.FC<InputDataProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(new Date(e.currentTarget.value));
  };

  return <input type={'date'} value={new Date(value).toISOString().slice(0, 10)} onChange={handleChange} />;
};
