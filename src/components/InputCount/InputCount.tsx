import React from 'react';

interface InputCountProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputCount: React.FC<InputCountProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(Number(e.currentTarget.value));
  };

  return <input type="number" placeholder="количество" value={value} onChange={handleChange} />;
};
