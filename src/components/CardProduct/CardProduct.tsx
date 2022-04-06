import React, { useState } from 'react';
import { Button } from '../Button';
import classes from './CardProduct.module.css';
import MultiClamp from 'react-multi-clamp';
import CheckIcon from '../../Main/icons/Check.svg';

export interface CardProductProps {
  id: string;
  name: string;
  count: string;
  measurementUnits: string;
  price?: string;
  buyWhere?: string;
  replacement?: string;
  onClick?: void;
  isChecked: boolean;
}

export const CardProduct: React.FC<CardProductProps> = (props) => {
  const { id, name, count, measurementUnits, price, isChecked } = props;
  const [check, setCheck] = useState(false);
  return (
    <div key={id} className={classes.card}>
      <h2>
        <MultiClamp ellipsis="..." clamp={2}>
          {name}
        </MultiClamp>
      </h2>
      <div style={{ display: `flex` }}>
        <div>
          <h3>Количество</h3>
          {count}&nbsp;
          {measurementUnits}
        </div>
        <div style={{ marginLeft: 40 }}>
          <h3>Цена</h3>
          <div>{price} р.</div>
        </div>
      </div>
      <Button onClick={() => setCheck(!check)} className={classes.checkButton}>
        <CheckIcon className={check && classes.checkIcon} />
      </Button>
    </div>
  );
};
