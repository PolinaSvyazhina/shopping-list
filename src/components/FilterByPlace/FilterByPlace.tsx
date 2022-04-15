import React from 'react';
import Select, { components } from 'react-select';
import './FilterByPlace.css';
import { Options } from './FilterOptions';

interface FilterProps {
  getPlaces: (value: Array<string>) => void;
}

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input className="checkbox" type="checkbox" checked={props.isSelected} onChange={() => null} id={'checkbox'} />{' '}
        <label htmlFor={'checkbox'}>{props.label}</label>
      </components.Option>
    </div>
  );
};

export const FilterByPlace: React.FC<FilterProps> = (props) => {
  const handleChange = (array: any) => {
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
        options={Options()}
        placeholder={'Место покупки'}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};
