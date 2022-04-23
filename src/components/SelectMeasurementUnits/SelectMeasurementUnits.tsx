import React from 'react';
import { MeasurementUnits } from '../../models/ProductStore.types';
import Select, { ActionMeta } from 'react-select';

interface SelectMeasurementUnitsProps {
  onValueChange?: (newSelections: SelectValue, actionMeta: ActionMeta<SelectValue>) => void;
}

export type SelectValue = {
  value: string;
  label: string;
};

const option: Array<SelectValue> = [
  { value: MeasurementUnits.Grams, label: MeasurementUnits.Grams },
  { value: MeasurementUnits.Pieces, label: MeasurementUnits.Pieces },
  { value: MeasurementUnits.Milliliters, label: MeasurementUnits.Milliliters },
];

export const SelectMeasurementUnits: React.FC<SelectMeasurementUnitsProps> = ({ onValueChange }) => {
  return (
    <Select
      options={option}
      onChange={onValueChange}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={'---'}
    />
  );
};
