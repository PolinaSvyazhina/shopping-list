import classes from './FormModal.module.css';
import { InputName } from '../InputName';
import { InputCount } from '../InputCount';
import { SelectMeasurementUnits } from '../SelectMeasurementUnits';
import { InputPrice } from '../InputPrice';
import { InputData } from '../InputData';
import { InputBuyWhere } from '../InputBuyWhere';
import { InputReplacement } from '../InputReplacement';
import React from 'react';
import { ProductModel } from '../../models/ProductStore.types';
import { ProductAction } from '../../Reducers/ProductReducer';

interface formModalProps {
  stateProduct: ProductModel;
  dispatch: (action: ProductAction) => void;
}

export const FormModal: React.FC<formModalProps> = ({ stateProduct, dispatch }) => {
  return (
    <form className={classes.container}>
      <p>Название</p>
      <InputName value={stateProduct.name} onValueChange={(value) => dispatch({ type: 'name', name: value })} />
      <div className={classes.form}>
        <div>
          <p>Количество</p>
          <InputCount value={stateProduct.count} onValueChange={(value) => dispatch({ type: 'count', count: value })} />
        </div>
        <div>
          <p>Единица измерения</p>
          <SelectMeasurementUnits
            value={stateProduct.measurementUnits}
            onValueChange={(value) =>
              dispatch({
                type: 'measurementUnits',
                measurementUnits: value,
              })
            }
          />
        </div>
        <div>
          <p>Цена за {stateProduct.measurementUnits}</p>
          <InputPrice value={stateProduct.price} onValueChange={(value) => dispatch({ type: 'price', price: value })} />
        </div>
        <div>
          <p>Примерная цена</p>
          <input readOnly value={Number(stateProduct.count) * Number(stateProduct.price)} />
        </div>
        <div>
          <p>К какому числу</p>
          <InputData value={stateProduct.date} onValueChange={(value) => dispatch({ type: 'data', data: value })} />
        </div>
      </div>
      <p>Где купить</p>
      <InputBuyWhere
        value={stateProduct.buyWhere}
        onValueChange={(value) => dispatch({ type: 'buyWhere', buyWhere: value })}
      />
      <p>Добавить замену, на случай отсутсвие</p>
      <InputReplacement
        value={stateProduct.replacement}
        onValueChange={(value) => dispatch({ type: 'replacement', replacement: value })}
      />
    </form>
  );
};
