import classes from './ProductEditor.module.css';
import { InputName } from '../InputName';
import { InputCount } from '../InputCount';
import { MeasurementUnitsSelect } from '../Selects/MeasurementUnitsSelect';
import { InputPrice } from '../InputPrice';
import { InputData } from '../InputData';
import { InputBuyWhere } from '../InputBuyWhere';
import { InputReplacement } from '../InputReplacement';
import React from 'react';
import { ProductModel } from '../../models/ProductStore.types';
import { ProductAction } from './ProductReducer';
import { priceConverter } from '../../priceConverter';
import { InputTotalPrice } from '../InputTotalPrice';
import { SelectValue } from '../Selects/SelectValue';

interface ProductEditorProps {
  stateProduct: ProductModel;
  dispatch: (action: ProductAction) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ stateProduct, dispatch }) => {
  function onChangeSelect(e: SelectValue) {
    dispatch({
      type: 'measurementUnits',
      measurementUnits: e.value,
    });
  }

  const convertedPriceResult = priceConverter(stateProduct);

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
          <MeasurementUnitsSelect onValueChange={onChangeSelect} />
        </div>
        <div>
          <p className="titleSmall">Цена за {convertedPriceResult.text} </p>
          <InputPrice
            value={convertedPriceResult.value}
            onValueChange={(value) => dispatch({ type: 'price', price: convertedPriceResult.price(value) })}
          />
        </div>
        <div>
          <p className="titleSmall">Примерная цена</p>
          <InputTotalPrice
            value={stateProduct.totalPrice}
            onValueChange={(value) => dispatch({ type: 'totalPrice', totalPrice: value })}
          />
        </div>
        <div>
          <p className="titleSmall">К какому числу</p>
          <InputData
            value={new Date(stateProduct.date).toISOString().slice(0, 10)}
            onValueChange={(value) => dispatch({ type: 'data', data: value })}
          />
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
