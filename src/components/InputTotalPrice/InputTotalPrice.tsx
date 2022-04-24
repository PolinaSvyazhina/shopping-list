import React from 'react';

interface InputTotalPriceProps {
  value?: number;
  onValueChange?: (value?: number) => void;
}

export const InputTotalPrice: React.FC<InputTotalPriceProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value !== '' ? Number(e.currentTarget.value) : null);
  };

  return <input type="number" placeholder="Примерная цена" value={value} onChange={handleChange} />;
};
