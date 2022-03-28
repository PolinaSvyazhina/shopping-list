import React, { useState } from 'react';
import { Button, Modal, Input } from '@skbkontur/react-ui';
import { MeasurementUnits, MeasurementUnitsType, ProductModel } from '../../models/ProductStore.types';
import { ProductStoreImpl } from '../../models/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';

interface ProductCreatorModalProps {
  onClose: () => void;
  initValues?: ProductModel;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const ProductEditorModal = observer(({ initValues, onClose }: ProductCreatorModalProps) => {
  const [panel, setPanel] = useState(false);
  const [stateProduct, setStateProduct] = useState<ProductModel>(
    initValues || {
      id: uuidv4(),
      name: '',
      count: '',
      measurementUnits: 'Grams',
      price: '',
      buyWhere: '',
      replacement: '',
      createDate: '',
    }
  );

  const isEdit = !!initValues;

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setStateProduct({
      ...stateProduct,
      ...{ name: e.target.value },
    });
  }

  function onChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    setStateProduct({
      ...stateProduct,
      ...{ price: e.target.value },
    });
  }

  function onChangeMeasurementUnits(e: React.ChangeEvent<HTMLSelectElement>) {
    setStateProduct({
      ...stateProduct,
      ...{ measurementUnits: e.target.value as MeasurementUnitsType },
    });
  }

  function onChangeBuyWhere(e: React.ChangeEvent<HTMLInputElement>) {
    setStateProduct({
      ...stateProduct,
      ...{ buyWhere: e.target.value },
    });
  }

  function onChangeReplacement(e: React.ChangeEvent<HTMLInputElement>) {
    setStateProduct({
      ...stateProduct,
      ...{ replacement: e.target.value },
    });
  }

  function addProduct() {
    ProductStoreImpl.addProduct(stateProduct);
    onClose();
  }

  function onChangeCount(e: React.ChangeEvent<HTMLInputElement>) {
    setStateProduct({
      ...stateProduct,
      ...{
        count: e.target.value,
      },
    });
  }

  return (
    <Modal onClose={onClose}>
      <Modal.Header>{isEdit ? 'Редактировать' : 'Добавить'} продукт</Modal.Header>
      <Modal.Body>
        <form>
          <label>Название</label>
          <Input placeholder="Название" value={stateProduct.name} onChange={onChangeName} required />
          <br />
          <label>Количество</label>
          <input type="number" value={stateProduct.count} onChange={onChangeCount} required />
          <br />
          <label>Единица измерения</label>
          <select value={stateProduct.measurementUnits} onChange={onChangeMeasurementUnits}>
            <option>{MeasurementUnits.Grams}</option>
            <option>{MeasurementUnits.Pieces}</option>
            <option>{MeasurementUnits.Milliliters}</option>
          </select>
          <br />
          <label>Примерная цена</label>
          <input />
          <br />
          <label>Цена за {stateProduct.measurementUnits}</label>
          <input type="number" value={stateProduct.price} onChange={onChangePrice} required />

          <br />
          <label>Где купить</label>
          <input placeholder="место" value={stateProduct.buyWhere} onChange={onChangeBuyWhere} />
          <br />
          <label>Добавить замену, на случай отсутсвие</label>
          <input placeholder="Что-то другое" value={stateProduct.replacement} onChange={onChangeReplacement} required />
        </form>
      </Modal.Body>
      <Modal.Footer panel={panel}>
        <Button onClick={addProduct}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});
