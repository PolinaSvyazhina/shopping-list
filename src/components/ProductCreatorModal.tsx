import React, { useState } from 'react';
import { Button, Toggle, Modal } from '@skbkontur/react-ui';
import { MeasurementUnits, ProductModel } from '../Models/ProductModel';
import { ProductStoreImpl } from '../Stores/ProductStore';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';

interface IProductCreatorModalProps {
  close: () => void;
}

export const ProductCreatorModal = observer((props: IProductCreatorModalProps) => {
  const [panel, setPanel] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    id: uuidv4(),
    name: '',
    count: '',
    measurementUnits: MeasurementUnits.Pieces,
    price: '',
    buyWhere: '',
    replacement: '',
    createDate: '',
  });

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
      ...{ measurementUnits: e.target.value as unknown as MeasurementUnits },
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
    props.close();
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
    <Modal onClose={props.close}>
      <Modal.Header>Добавить продукт</Modal.Header>
      <Modal.Body>
        <form>
          <label>Название</label>
          <input placeholder="Название" value={stateProduct.name} onChange={onChangeName} required />
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
