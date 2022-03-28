import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../containers/ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';

export const Main = observer(() => {
  const [markedList, setMarkedList] = useState<string[]>();
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

  return (
    <div>
      {opened && <ProductEditorModal onClose={close} />}
      <h1>Список покупок</h1>
      <button onClick={open}>Добавить</button>

      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>
          {markedList.includes(e.id) && <span>Выбрали МЕНЯ!!!!</span>}
          <div>{e.name}</div>
          <div>
            {e.count}
            {e.measurementUnits}
          </div>
          <div>{e.price}</div>
          <div> {e.buyWhere}</div>
          <div>{e.replacement}</div>
          <button onClick={() => setMarkedList([...markedList, e.id])}>Галочка</button>
        </div>
      ))}
      <button onClick={removeAll}>Удалить</button>
    </div>
  );
});
