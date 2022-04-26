import React, { useRef } from 'react';

import classes from './ProductEditor.module.css';
import { Input } from '../Input';

import { SelectMeasurementUnits } from '../SelectMeasurementUnits';
import { InputPrice } from '../InputPrice';
import { InputData } from '../InputData';
import { InputBuyWhere } from '../InputBuyWhere';
import { InputReplacement } from '../InputReplacement';
import { ProductModel } from '../../models/ProductStore.types';
import { ProductAction } from './ProductReducer';
import { SelectValue } from '../SelectFilterMark/SelectFilterMark';
import { priceConverter } from '../../priceConverter';
import { InputTotalPrice } from '../InputTotalPrice';

import { ValidationContainer, ValidationWrapper, ValidationInfo } from '@skbkontur/react-ui-validations';

interface ProductEditorProps {
  stateProduct: ProductModel;
  dispatch: (action: ProductAction) => void;
}

const validateCount = (value: number | null): ValidationInfo | null => {
  if (!value) {
    return {
      message: 'Введите количество',
      type: 'submit',
    };
  }

  return null;
};

export const ProductEditor: React.FC<ProductEditorProps> = ({ stateProduct, dispatch }) => {
  const refValidationContainer = useRef<ValidationContainer>(null);

  function onChangeSelect(e: SelectValue) {
    dispatch({
      type: 'measurementUnits',
      measurementUnits: e.value,
    });
  }

  const convertedPriceResult = priceConverter(stateProduct);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isValid = await refValidationContainer.current.validate();

    if (!isValid) {
      return;
    }
  };

  return (
    <ValidationContainer ref={refValidationContainer}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <p className="titleSmall">Название</p>
        <Input
          width={468}
          type="string"
          value={stateProduct.name}
          onValueChange={(value) => dispatch({ type: 'name', name: value })}
        />
        <div className={classes.form}>
          <div>
            <p className="titleSmall">Количество</p>
            <ValidationWrapper validationInfo={validateCount(stateProduct.count)}>
              <Input
                width={202}
                type="number"
                value={stateProduct.count === null ? '' : stateProduct.count.toString()}
                onValueChange={(value) => dispatch({ type: 'count', count: Number(value) || null })}
              />
            </ValidationWrapper>
          </div>
          <div>
            <p className="titleSmall">Единица измерения</p>
            <SelectMeasurementUnits onValueChange={onChangeSelect} />
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

        <button type="submit">save</button>
      </form>
    </ValidationContainer>
  );
};
