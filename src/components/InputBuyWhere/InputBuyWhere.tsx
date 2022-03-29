import React from 'react';

interface InputBuyWhereProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const InputBuyWhere: React.FC<InputBuyWhereProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return <input placeholder="место" value={value} onChange={handleChange} />;
};
