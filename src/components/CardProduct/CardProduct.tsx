import React from 'react';
import { ButtonSelect } from '../ButtonSelect';
import classes from './CardProduct.module.css';
import MultiClamp from 'react-multi-clamp';

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
      <ButtonSelect isChecked={isChecked} />
      {/* <button onClick={() => setMarkedList([...markedList, e.id])}>Галочка</button> */}
    </div>
  );
};
