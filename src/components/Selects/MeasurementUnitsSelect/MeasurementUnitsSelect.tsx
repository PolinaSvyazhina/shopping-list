import React from 'react';
import { MeasurementUnits } from '../../../models/ProductStore.types';
import Select, { ActionMeta } from 'react-select';
import { SelectValue } from '../SelectValue';

interface MeasurementUnitsSelectProps {
  onValueChange?: (newSelections: SelectValue, actionMeta: ActionMeta<SelectValue>) => void;
}

const option: Array<SelectValue> = [
  { value: MeasurementUnits.Grams, label: MeasurementUnits.Grams },
  { value: MeasurementUnits.Pieces, label: MeasurementUnits.Pieces },
  { value: MeasurementUnits.Milliliters, label: MeasurementUnits.Milliliters },
];

export const MeasurementUnitsSelect: React.FC<MeasurementUnitsSelectProps> = ({ onValueChange }) => {
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
