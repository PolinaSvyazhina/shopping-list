import React from 'react';
import Select, { ActionMeta } from 'react-select';
import { SelectValue } from '../SelectValue';

interface ProductSortSelectProps {
  onChange?: (newSelections: SelectValue, actionMeta: ActionMeta<SelectValue>) => void;
}

export enum ProductSortSelectValue {
  None = 'Без сортировки',
  AddedEarlier = 'Добавили раньше',
  AddedLater = 'Добавили позже',
  Expensive = 'Дороже',
  Cheaper = 'Дешевле',
  Alphabetically = 'А-Я',
  ReverseAlphabetically = 'Я-А',
}

const options: Array<SelectValue> = [
  { value: ProductSortSelectValue.None, label: ProductSortSelectValue.None },
  { value: ProductSortSelectValue.AddedEarlier, label: ProductSortSelectValue.AddedEarlier },
  { value: ProductSortSelectValue.AddedLater, label: ProductSortSelectValue.AddedLater },
  { value: ProductSortSelectValue.Expensive, label: ProductSortSelectValue.Expensive },
  { value: ProductSortSelectValue.Cheaper, label: ProductSortSelectValue.Cheaper },
  { value: ProductSortSelectValue.Alphabetically, label: ProductSortSelectValue.Alphabetically },
  {
    value: ProductSortSelectValue.ReverseAlphabetically,
    label: ProductSortSelectValue.ReverseAlphabetically,
  },
];

export const ProductsSortSelect: React.FC<ProductSortSelectProps> = ({ onChange }) => {
  return (
    <div>
      <Select
        options={options}
        onChange={onChange}
        className="react-select-container"
        classNamePrefix="react-select"
        defaultValue={options[0]}
      />
    </div>
  );
};
