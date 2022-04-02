import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../containers/ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';
import { ProductModel } from '../models/ProductStore.types';

export const Main = observer(() => {
  const [markedList, setMarkedList] = useState<string[]>();
  const [opened, setOpened] = useState(false);
  const [initValues, setInitValue] = useState(null);

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  // function remove() {
  //   for (const i in markedList) {
  //     ProductStoreImpl.removeProduct(i);
  //   }
  // }

  function removeAll() {
    ProductStoreImpl.removeAllProducts();
  }

  return (
    <div>
      {opened && <ProductEditorModal onClose={close} initValues={initValues} />}
      <h1>Список покупок</h1>
      <button
        onClick={() => {
          setInitValue(null);
          open();
        }}
      >
        Добавить
      </button>

      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>
          <div>{e.name}</div>
          <div>
            {e.count}
            {e.measurementUnits}
          </div>
          <div>{Number(e.count) * Number(e.price)}</div>
          <div>{e.date}</div>
          <div> {e.buyWhere}</div>
          <div>{e.replacement}</div>
          <button onClick={() => setMarkedList([...markedList, e.id])}>Галочка</button>
          <button
            onClick={() => {
              setInitValue(e);
              setOpened(true);
            }}
          >
            Редактировать
          </button>
        </div>
      ))}
      <button onClick={removeAll}>Удалить</button>
    </div>
  );
});
