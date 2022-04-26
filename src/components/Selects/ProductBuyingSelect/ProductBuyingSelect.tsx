import React from 'react';
import classes from './ProductBuyingSelect.module.css';
import Select, { ActionMeta } from 'react-select';
import { SelectValue } from '../SelectValue';

interface ProductBuyingSelectProps {
  onChange?: (newSelections: SelectValue, actionMeta: ActionMeta<SelectValue>) => void;
}

const option: Array<SelectValue> = [
  { value: 'showAll', label: 'Показывать всё' },
  { value: 'purchased', label: 'Купленные' },
  { value: 'unpurchased', label: 'Не купленные' },
];

export const ProductBuyingSelect: React.FC<ProductBuyingSelectProps> = ({ onChange }) => {
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
