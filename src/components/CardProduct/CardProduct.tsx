import React from 'react';
import clsx from 'clsx';
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
  totalPrice?: number;
  buyWhere?: string;
  replacement?: string;
  onClick?: () => void;
  isChecked: boolean;
  switchBoughtProduct: () => void;
  isBought: () => boolean;
}

const ruble = '₽';

export const CardProduct: React.FC<CardProductProps> = observer((props) => {
  const { id, name, count, measurementUnits, totalPrice } = props;
  return (
    <div key={id} className={classes.card}>
      <div className={classes.cardInfo} onClick={props.onClick}>
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
          {totalPrice ? (
            <div style={{ marginLeft: 40 }}>
              <p className={`titleSmall ${classes.titleSmall}`}>Цена</p>
              <div>
                {totalPrice}
                {ruble}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Button
        onClick={() => {
          props.switchBoughtProduct();
        }}
        className={classes.checkButton}
      >
        <CheckIcon className={clsx(classes.uncheckIcon, props.isBought() && classes.checkIcon)} />
      </Button>
    </div>
  );
});
