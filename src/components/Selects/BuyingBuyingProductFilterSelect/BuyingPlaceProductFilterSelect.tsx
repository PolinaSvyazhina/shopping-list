import React from 'react';
import Select, { components, GroupBase, OptionProps } from 'react-select';
import './BuyingPlaceProductFilterSelect.css';
import { SelectValue } from '../SelectValue';

interface PurchasePlaceProductFilterSelectProps {
  getPlaces: (value: Array<string>) => void;
  placesForOptions: Array<SelectValue>;
}

const Option = (props: JSX.IntrinsicAttributes & OptionProps<unknown, boolean, GroupBase<unknown>>) => {
  return (
    <div>
      <components.Option {...props}>
        <input className="checkbox" type="checkbox" checked={props.isSelected} onChange={() => null} id={'checkbox'} />{' '}
        <label htmlFor={'checkbox'}>{props.label}</label>
      </components.Option>
    </div>
  );
};

export const BuyingPlaceProductFilterSelect: React.FC<PurchasePlaceProductFilterSelectProps> = (props) => {
  const handleChange = (array: { label: string; value: string }[]) => {
    const value: Array<string> = [];
    array.map((e: { label: string; value: string }) => {
      value.push(e.value);
    });
    props.getPlaces(value);
  };

  return (
    <div className="select">
      <Select
        components={{ Option }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isMulti
        options={props.placesForOptions}
        placeholder={'Место покупки'}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};
