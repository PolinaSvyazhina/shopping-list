import React from 'react';

interface InputCountProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputCount: React.FC<InputCountProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value !== '' ? Number(e.currentTarget.value) : null);
  };

  return <input type="number" placeholder="количество" value={value} onChange={handleChange} />;
};
