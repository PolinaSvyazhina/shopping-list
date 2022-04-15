import React, { useState } from 'react';
import { Button } from '../Button';
import classes from './CardProduct.module.css';
import MultiClamp from 'react-multi-clamp';
import CheckIcon from '../../Main/icons/Check.svg';

export interface CardProductProps {
  id: string;
  name: string;
  count: number;
  measurementUnits: string;
  price?: number;
  buyWhere?: string;
  replacement?: string;
  onClick?: () => void;
  isChecked: boolean;
  setMarkedList: () => void;
}

export const CardProduct: React.FC<CardProductProps> = (props) => {
  const { id, name, count, measurementUnits, price } = props;
  const [check, setCheck] = useState(false);
  return (
    <div key={id} className={classes.card}>
      <div onClick={props.onClick}>
        <p className={`titleMedium ${classes.titleMedium}`}>
          <MultiClamp ellipsis="..." clamp={2}>
            {name}
          </MultiClamp>
        </p>
        <div style={{ display: `flex` }}>
          <div>
            <p className={`titleSmall ${classes.titleSmall}`}>Количество</p>
            {count}&nbsp;
            {measurementUnits}
          </div>
          {price ? (
            <div style={{ marginLeft: 40 }}>
              <p className={`titleSmall ${classes.titleSmall}`}>Цена</p>
              <div>{price} р.</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Button
        onClick={() => {
          setCheck(!check);
          props.setMarkedList();
        }}
        className={classes.checkButton}
      >
        <CheckIcon className={check && classes.checkIcon} />
      </Button>
    </div>
  );
};
