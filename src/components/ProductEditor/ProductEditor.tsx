import classes from './ProductEditor.module.css';
import { Input } from '../Input';
import { ProductModel } from '../../models/ProductStore.types';
import { ProductAction } from './ProductReducer';
import { priceConverter } from '../../priceConverter';
import clsx from 'clsx';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { validateCount, validateName, validatePrice, validateTotalPrice } from './ProductEditorValidation';
import { Button } from '../Button';
import { ProductStoreImpl } from '../../models/ProductStore';
import React, { useRef } from 'react';
import { SelectValue } from '../Selects/SelectValue';
import { MeasurementUnitsSelect } from '../Selects/MeasurementUnitsSelect';

interface ProductEditorProps {
  stateProduct: ProductModel;
  dispatch: (action: ProductAction) => void;
  onClose: () => void;
  isCard: boolean;
  isEdit: boolean;
  SetIsEdit: (value: boolean) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ stateProduct, dispatch, onClose, SetIsEdit, isEdit }) => {
  const refValidationContainer = useRef<ValidationContainer>(null);

  async function addProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const isValid = await refValidationContainer.current.validate();
    if (!isValid) {
      return;
    }
    ProductStoreImpl.addProduct(stateProduct as ProductModel);
    onClose();
  }

  async function updateProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const isValid = await refValidationContainer.current.validate();
    if (!isValid) {
      return;
    }
    ProductStoreImpl.updateProduct(stateProduct as ProductModel);
    onClose();
  }

  function onChangeSelect(e: SelectValue) {
    dispatch({
      type: 'measurementUnits',
      measurementUnits: e.value,
    });
  }

  const convertedPriceResult = priceConverter(stateProduct);

  const handleTotalPriceChange = (value: string) => {
    dispatch({
      type: 'totalPrice',
      totalPrice: Number(value) || null,
    });

    refValidationContainer.current?.validate();
  };

  const handlePriceChange = (value: string) => {
    dispatch({
      type: 'price',
      price: convertedPriceResult.price(Number(value) || null),
    });
    refValidationContainer.current?.validate();
  };

  return (
    <ValidationContainer ref={refValidationContainer}>
      <form className={classes.container}>
        <div className={classes.name}>
          <p className="titleSmall">Название</p>
          <ValidationWrapper validationInfo={validateName(stateProduct.name)}>
            <Input
              width={468}
              placeholder={'Название'}
              type="string"
              value={stateProduct.name}
              onValueChange={(value) => dispatch({ type: 'name', name: value })}
            />
          </ValidationWrapper>
        </div>
        <div className={classes.count}>
          <p className="titleSmall">Количество</p>
          <ValidationWrapper validationInfo={validateCount(stateProduct.count)}>
            <Input
              width={202}
              type="number"
              placeholder={'Количество'}
              value={stateProduct.count === null ? null : stateProduct.count.toString()}
              onValueChange={(value) => dispatch({ type: 'count', count: Number(value) || null })}
            />
          </ValidationWrapper>
        </div>
        <div className={classes.measurement}>
          <p className="titleSmall">Единица измерения</p>
          <MeasurementUnitsSelect onValueChange={onChangeSelect} />
        </div>
        <div className={classes.price}>
          <p className="titleSmall">Цена за {convertedPriceResult.text} </p>
          <ValidationWrapper validationInfo={validatePrice(stateProduct.price)}>
            <Input
              width={202}
              type="number"
              placeholder="Цена"
              value={stateProduct.price === null ? '' : convertedPriceResult.value.toString()}
              onValueChange={handlePriceChange}
            />
          </ValidationWrapper>
        </div>
        <div className={classes.total}>
          <p className="titleSmall">Примерная цена</p>
          <ValidationWrapper validationInfo={validateTotalPrice(stateProduct.totalPrice)}>
            <Input
              width={202}
              type="number"
              value={`${stateProduct.totalPrice ?? ''}`}
              onValueChange={handleTotalPriceChange}
            />
          </ValidationWrapper>
        </div>
        <div className={classes.date}>
          <p className="titleSmall">К какому числу</p>
          <Input
            type={'date'}
            width={202}
            value={new Date(stateProduct.date).toISOString().slice(0, 10)}
            onValueChange={(value) => dispatch({ type: 'data', data: new Date(value) })}
          />
        </div>
        <div className={classes.buy}>
          <p className="titleSmall">Где купить</p>
          <Input
            width={468}
            placeholder={'Место'}
            type="string"
            value={stateProduct.buyWhere}
            onValueChange={(value) => dispatch({ type: 'buyWhere', buyWhere: value })}
          />
        </div>
        <div className={classes.replacement}>
          <p className="titleSmall">Добавить замену, на случай отсутсвия</p>
          <Input
            width={468}
            placeholder={'Что-то другое'}
            type="string"
            value={stateProduct.replacement}
            onValueChange={(value) => dispatch({ type: 'replacement', replacement: value })}
          />
        </div>
        {isEdit ? (
          <>
            <Button className={clsx(classes.redButton, classes.coordinatesButton)} onClick={() => SetIsEdit(false)}>
              Отмена
            </Button>
            <Button className={clsx(classes.coordinatesButton, classes.end)} onClick={updateProduct}>
              Сохранить
            </Button>
          </>
        ) : (
          <Button className={clsx(classes.addProductButton, classes.coordinatesAddingButton)} onClick={addProduct}>
            Добавить
          </Button>
        )}
      </form>
    </ValidationContainer>
  );
};
