import React, { useReducer, useState } from 'react';
import classes from './ProductEditorModal.module.css';
import { Button } from '../components/Button';
import { MeasurementUnits, MeasurementUnitsType, ProductModel } from '../models/ProductStore.types';
import { ProductStoreImpl } from '../models/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { productReducer } from '../components/FormModal/ProductReducer';
import { ProductEditor } from '../components/FormModal';
import { ProductInfo } from '../components/ProductInfo';
import { Modal } from '../components/Modal';

interface ProductCreatorModalProps {
  onClose: () => void;
  initValues?: ProductModel;
}

export const ProductEditorModal = observer((props: ProductCreatorModalProps) => {
  const state: ProductModel = props.initValues ?? {
    id: uuidv4(),
    name: '',
    count: null,
    measurementUnits: MeasurementUnits.Grams as MeasurementUnitsType,
    price: null,
    totalPrice: null,
    buyWhere: '',
    replacement: '',
    date: new Date(Date.now()),
    marked: false,
  };

  const [stateProduct, dispatch] = useReducer(productReducer, state);
  const [isEdit, SetIsEdit] = useState(false);

  const isCard = !!props.initValues;

  function addProduct() {
    ProductStoreImpl.addProduct(stateProduct as ProductModel);
    props.onClose();
  }

  function updateProduct() {
    ProductStoreImpl.updateProduct(stateProduct as ProductModel);
    props.onClose();
  }

  function removeProduct() {
    ProductStoreImpl.removeProduct(stateProduct.id);
    props.onClose();
  }

  return (
    <Modal
      onClose={props.onClose}
      title={isEdit ? 'Редактирование' : isCard ? stateProduct.name : 'Добавить позицию'}
      content={
        isCard && !isEdit ? (
          <ProductInfo stateProduct={stateProduct as ProductModel} />
        ) : (
          <ProductEditor stateProduct={stateProduct as ProductModel} dispatch={dispatch} />
        )
      }
      footer={
        isEdit ? (
          <>
            <Button className={classes.redButton} onClick={() => SetIsEdit(false)}>
              Отмена
            </Button>
            <Button onClick={updateProduct}>Сохранить</Button>
          </>
        ) : isCard ? (
          <>
            <Button className={classes.redButton} onClick={removeProduct}>
              Удалить
            </Button>
            <Button
              onClick={() => {
                SetIsEdit(true);
              }}
            >
              Изменить
            </Button>
          </>
        ) : (
          <Button className={classes.addProductButton} onClick={addProduct}>
            Добавить
          </Button>
        )
      }
    />
  );
});
