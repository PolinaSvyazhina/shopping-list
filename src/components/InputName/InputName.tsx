import React from 'react';

interface InputNameProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputName: React.FC<InputNameProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input placeholder="название" value={value} onChange={handleChange} required />;
};
