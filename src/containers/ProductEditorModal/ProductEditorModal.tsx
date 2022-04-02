import React, { useReducer, useState } from 'react';
import { Button, Modal } from '@skbkontur/react-ui';
import { MeasurementUnits, MeasurementUnitsType, ProductModel } from '../../models/ProductStore.types';
import { ProductStoreImpl } from '../../models/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { InputBuyWhere } from '../../components/InputBuyWhere';
import { InputReplacement } from '../../components/InputReplacement';
import { InputPrice } from '../../components/InputPrice';
import { InputCount } from '../../components/InputCount';
import { InputName } from '../../components/InputName';
import { SelectMeasurementUnits } from '../../components/SelectMeasurementUnits';
import { productReducer } from '../../Reducers/ProductReducer';
import { InputData } from '../../components/InputData';

interface ProductCreatorModalProps {
  onClose: () => void;
  initValues?: ProductModel;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const ProductEditorModal = observer(({ initValues, onClose }: ProductCreatorModalProps) => {
  const [panel] = useState(false);
  const state: ProductModel = initValues ?? {
    id: uuidv4(),
    name: '',
    count: '',
    measurementUnits: MeasurementUnits.Grams as MeasurementUnitsType,
    price: '',
    buyWhere: '',
    replacement: '',
    date: '',
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
        <form>
          <label>Название</label>
          <InputName value={stateProduct.name} onValueChange={(value) => dispatch({ type: 'name', name: value })} />
          <br />
          <label>Количество</label>
          <InputCount value={stateProduct.count} onValueChange={(value) => dispatch({ type: 'count', count: value })} />
          <br />
          <label>Единица измерения</label>
          <SelectMeasurementUnits
            value={stateProduct.measurementUnits}
            onValueChange={(value) => dispatch({ type: 'measurementUnits', measurementUnits: value })}
          />
          <br />
          <label>Цена за {stateProduct.measurementUnits}</label>
          <InputPrice value={stateProduct.price} onValueChange={(value) => dispatch({ type: 'price', price: value })} />
          <br />
          <label>Примерная цена</label>
          <input readOnly value={Number(stateProduct.count) * Number(stateProduct.price)} />
          <br />
          <label>К какому числу</label>
          <InputData value={stateProduct.date} onValueChange={(value) => dispatch({ type: 'data', data: value })} />
          <br />
          <label>Где купить</label>
          <InputBuyWhere
            value={stateProduct.buyWhere}
            onValueChange={(value) => dispatch({ type: 'buyWhere', buyWhere: value })}
          />
          <br />
          <label>Добавить замену, на случай отсутсвие</label>
          <InputReplacement
            value={stateProduct.replacement}
            onValueChange={(value) => dispatch({ type: 'replacement', replacement: value })}
          />
        </form>
      </Modal.Body>
      <Modal.Footer panel={panel}>
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
