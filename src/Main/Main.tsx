import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductCreatorModal } from '../components/ProductCreatorModal';
import { ProductStoreImpl } from '../Stores/ProductStore';

export const Main = observer(() => {
  const [opened, setOpened] = useState(false);
  const [panel, setPanel] = useState(false);

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }
  function remove() {
    for (const i in markedList) {
      ProductStoreImpl.removeProduct(i);
    }
  }
  function removeAll() {
    const product = ProductStoreImpl.products.map((e) => e.id);
    for (const i in product) {
      ProductStoreImpl.removeProduct(i);
    }
  }
  const markedList: any = [];
  return (
    <div>
      {opened && <ProductCreatorModal close={close} />}
      <h1>Список покупок</h1>
      <button onClick={open}>Добавить</button>

      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>
          <div>{e.name}</div>
          <div>
            {e.count}
            {e.measurementUnits}
          </div>
          <div>{e.price}</div>
          <div> {e.buyWhere}</div>
          <div>{e.replacement}</div>
          <button onClick={() => markedList.push(e.id)}>Галочка</button>
        </div>
      ))}
      <button onClick={removeAll}>Удалить</button>
    </div>
  );
});
