import React from 'react';
import Select, { components } from 'react-select';
import classes from './FilterByPlace.module.css';
import { Options } from './FilterOptions';

interface FilterProps {
  getPlaces: (value: Array<string>) => void;
}

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          className={classes.checkbox}
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          id={'checkbox'}
        />{' '}
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

  const customStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      minWidth: 200,
      height: 40,
      background: '#e9edf1',
      border: 0,
      borderRadius: 10,
      boxShadow: 'inset 5px 5px 15px #b2c2d2, inset -5px -5px 15px #e9f2fb',
    }),
    option: (styles: any) => {
      const color = 'pink';
      return {
        ...styles,
        backgroundColor: 'none',
        color: '#5A6B7F',
        cursor: 'pointer',
        ':hover': {
          color: '#212933',

          backgroundColor: '#E9EDF1',
        },

        ':active': {
          color: '#212933',
          backgroundColor: '#E9EDF1',
        },
      };
    },
    placeholder: (defaultStyles: any) => ({
      ...defaultStyles,
      color: '#5a6b7f',
    }),
    multiValueLabel: (defaultStyles: any) => ({
      ...defaultStyles,
      color: '#EFF4FA',
      backgroundColor: '#5D9DFF',
      borderRadius: `5px 0 0 5px`,
    }),
    multiValueRemove: (defaultStyles: any) => ({
      ...defaultStyles,
      color: '#EFF4FA',
      backgroundColor: '#5D9DFF',
      borderRadius: `0 5px 5px 0`,
      ':hover': {
        backgroundColor: '#F46770',
      },
    }),
  };

  return (
    <div className={classes.select}>
      <Select
        styles={customStyles}
        components={{ Option }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isMulti
        options={Options()}
        placeholder={'Место покупки'}
        onChange={handleChange}
      />
    </div>
  );
};
