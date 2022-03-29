import React from 'react';

interface InputPriceProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputPrice: React.FC<InputPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input type="number" placeholder="цена" value={value} onChange={handleChange} required />;
};
