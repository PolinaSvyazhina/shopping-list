import React, { useReducer, useRef, useState } from 'react';
import classes from './ProductEditorModal.module.css';
import { Modal } from '@skbkontur/react-ui';
import { Button } from '../../components/Button';
import { MeasurementUnits, MeasurementUnitsType, ProductModel } from '../../models/ProductStore.types';
import { ProductStoreImpl } from '../../models/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { productReducer } from '../../components/FormModal/ProductReducer';

import { ProductEditor } from '../../components/FormModal';
import { ProductInfo } from '../../components/ProductInfo';

interface ProductCreatorModalProps {
  onClose: () => void;
  initValues?: ProductModel;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const ProductEditorModal = observer(({ initValues, onClose }: ProductCreatorModalProps) => {
  const panel = useRef(false);

  const state: ProductModel = initValues ?? {
    id: uuidv4(),
    name: '',
    count: null,
    measurementUnits: MeasurementUnits.Grams as MeasurementUnitsType,
    price: null,
    buyWhere: '',
    replacement: '',
    date: new Date(Date.now()),
  };

  const [stateProduct, dispatch] = useReducer(productReducer, state);
  const [isEdit, SetIsEdit] = useState(false);

  const isCard = !!initValues;

  function addProduct() {
    ProductStoreImpl.addProduct(stateProduct as ProductModel);
    onClose();
  }

  function updateProduct() {
    ProductStoreImpl.updateProduct(stateProduct as ProductModel);
    onClose();
  }

  function removeProduct() {
    ProductStoreImpl.removeProduct(stateProduct.id);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        <h1>{isEdit ? 'Редактирование' : isCard ? stateProduct.name : 'Добавить позицию'}</h1>
      </Modal.Header>
      <Modal.Body>
        {isCard && !isEdit ? (
          <ProductInfo stateProduct={stateProduct as ProductModel} />
        ) : (
          <ProductEditor stateProduct={stateProduct as ProductModel} dispatch={dispatch} />
        )}
      </Modal.Body>
      <Modal.Footer panel={panel.current}>
        {isEdit ? (
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
          <Button onClick={addProduct}>Добавить</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
