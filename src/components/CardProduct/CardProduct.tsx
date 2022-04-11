import React from 'react';
import { Button } from '../Button';
import classes from './CardProduct.module.css';
import MultiClamp from 'react-multi-clamp';
import CheckIcon from '../../Main/icons/Check.svg';
import { observer } from 'mobx-react-lite';

export interface CardProductProps {
  id: string;
  name: string;
  count: number;
  measurementUnits: string;
  price?: number;
  buyWhere?: string;
  replacement?: string;
  onClick?: void;
  isChecked: boolean;
  setMarkedList: () => void;
  isMarked: () => boolean;
}

export const CardProduct: React.FC<CardProductProps> = observer((props) => {
  const { id, name, count, measurementUnits, price } = props;
  return (
    <div key={id} className={classes.card}>
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
        <div style={{ marginLeft: 40 }}>
          <p className={`titleSmall ${classes.titleSmall}`}>Цена</p>
          <div>{price} р.</div>
        </div>
      </div>
      <Button
        onClick={() => {
          props.setMarkedList();
        }}
        className={classes.checkButton}
      >
        <CheckIcon className={props.isMarked() && classes.checkIcon} />
      </Button>
    </div>
  );
});
