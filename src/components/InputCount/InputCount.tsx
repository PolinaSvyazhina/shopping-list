import React from 'react';

interface InputCountProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputCount: React.FC<InputCountProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input type="number" placeholder="количество" value={value} onChange={handleChange} required />;
};
