import classes from './ProductEditor.module.css';
import { InputName } from '../InputName';
import { InputCount } from '../InputCount';
import { SelectMeasurementUnits } from '../SelectMeasurementUnits';
import { InputPrice } from '../InputPrice';
import { InputData } from '../InputData';
import { InputBuyWhere } from '../InputBuyWhere';
import { InputReplacement } from '../InputReplacement';
import React from 'react';
import { ProductModel } from '../../models/ProductStore.types';
import { ProductAction } from './ProductReducer';

interface ProductEditorProps {
  stateProduct: ProductModel;
  dispatch: (action: ProductAction) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ stateProduct, dispatch }) => {
  return (
    <form className={classes.container}>
      <p className="titleSmall">Название</p>
      <InputName value={stateProduct.name} onValueChange={(value) => dispatch({ type: 'name', name: value })} />
      <div className={classes.form}>
        <div>
          <p className="titleSmall">Количество</p>
          <InputCount value={stateProduct.count} onValueChange={(value) => dispatch({ type: 'count', count: value })} />
        </div>
        <div>
          <p className="titleSmall">Единица измерения</p>
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
          <p className="titleSmall">Цена за {stateProduct.measurementUnits}</p>
          <InputPrice value={stateProduct.price} onValueChange={(value) => dispatch({ type: 'price', price: value })} />
        </div>
        <div>
          <p className="titleSmall">Примерная цена</p>
          <input
            className={classes.background}
            readOnly
            value={Number(stateProduct.count) * Number(stateProduct.price)}
          />
        </div>
        <div>
          <p className="titleSmall">К какому числу</p>
          <InputData value={stateProduct.date} onValueChange={(value) => dispatch({ type: 'data', data: value })} />
        </div>
      </div>
      <p className="titleSmall">Где купить</p>
      <InputBuyWhere
        value={stateProduct.buyWhere}
        onValueChange={(value) => dispatch({ type: 'buyWhere', buyWhere: value })}
      />
      <p className="titleSmall">Добавить замену, на случай отсутсвия</p>
      <InputReplacement
        value={stateProduct.replacement}
        onValueChange={(value) => dispatch({ type: 'replacement', replacement: value })}
      />
    </form>
  );
};
