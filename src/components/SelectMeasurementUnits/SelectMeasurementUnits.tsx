import React from 'react';
import { MeasurementUnits } from '../../models/ProductStore.types';

interface SelectMeasurementUnitsProps {
  value?: string;
  onValueChange?: (value?: string) => void;
}

export const SelectMeasurementUnits: React.FC<SelectMeasurementUnitsProps> = ({ value, onValueChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onValueChange(e.currentTarget.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option>{MeasurementUnits.Grams}</option>
      <option>{MeasurementUnits.Pieces}</option>
      <option>{MeasurementUnits.Milliliters}</option>
    </select>
  );
};