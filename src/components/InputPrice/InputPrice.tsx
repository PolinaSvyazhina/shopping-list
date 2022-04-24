import React from 'react';

interface InputPriceProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputPrice: React.FC<InputPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value !== '' ? Number(e.currentTarget.value) : null);
  };

  return <input type="number" placeholder="цена" value={value} onChange={handleChange} required />;
};
