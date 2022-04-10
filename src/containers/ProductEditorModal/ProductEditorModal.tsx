import React, { useReducer, useRef } from 'react';
import { Button, Modal } from '@skbkontur/react-ui';
import { MeasurementUnits, MeasurementUnitsType, ProductModel } from '../../models/ProductStore.types';
import { ProductStoreImpl } from '../../models/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { productReducer } from '../../components/FormModal/ProductReducer';
import { ProductEditor } from '../../components/FormModal';

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
  const isEdit = !!initValues;

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
      <Modal.Header>{isEdit ? 'Редактировать' : 'Добавить'} продукт</Modal.Header>
      <Modal.Body>
        <ProductEditor stateProduct={stateProduct as ProductModel} dispatch={dispatch} />
      </Modal.Body>
      <Modal.Footer panel={panel.current}>
        {isEdit ? (
          <>
            <Button onClick={updateProduct}> Изменить</Button>
            <Button onClick={removeProduct}>Удалить</Button>
          </>
        ) : (
          <Button onClick={addProduct}>Добавить</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});
