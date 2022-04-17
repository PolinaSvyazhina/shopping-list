import React from 'react';
import classes from './selectFilterMark.module.css';
import Select, { ActionMeta } from 'react-select';

interface SelectFilterMarkProps {
  onChange?: (newSelections: SelectValue, actionMeta: ActionMeta<SelectValue>) => void;
}

export type SelectValue = {
  label: string;
  value: string;
};

const option: Array<SelectValue> = [
  { value: 'showAll', label: 'Показывать всё' },
  { value: 'purchased', label: 'Купленные' },
  { value: 'unpurchased', label: 'Не купленные' },
];

export const SelectFilterMark: React.FC<SelectFilterMarkProps> = ({ onChange }) => {
  return (
    <div className={classes.select}>
      <Select
        placeholder={'Показывать всё'}
        options={option}
        onChange={onChange}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};
