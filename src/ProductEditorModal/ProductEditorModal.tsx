import React, { useReducer, useState } from 'react';
import { MeasurementUnits, MeasurementUnitsType, ProductModel } from '../models/ProductStore.types';
import { ProductStoreImpl } from '../models/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { productReducer } from '../components/ProductEditor/ProductReducer';
import { ProductEditor } from '../components/ProductEditor';
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
          <ProductInfo
            SetIsEdit={SetIsEdit}
            removeProduct={removeProduct}
            stateProduct={stateProduct as ProductModel}
          />
        ) : (
          <ProductEditor
            stateProduct={stateProduct as ProductModel}
            dispatch={dispatch}
            onClose={props.onClose}
            isEdit={isEdit}
            SetIsEdit={SetIsEdit}
            isCard={isCard}
          />
        )
      }
      footer={null}
    />
  );
});
