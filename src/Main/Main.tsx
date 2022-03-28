import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductCreatorModal } from '../components/ProductCreatorModal';
import { ProductStoreImpl } from '../Stores/ProductStore';

export const Main = observer(() => {
  useEffect(() => ProductStoreImpl.getProducts, []);
  const [opened, setOpened] = useState(false);
  const [panel, setPanel] = useState(false);

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  return (
    <div>
      {opened && <ProductCreatorModal close={close} />}
      <h1>Список покупок</h1>
      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>{e.name}</div>
      ))}
      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>
          {e.count}
          {e.measurementUnits}
        </div>
      ))}
      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>{e.price}</div>
      ))}
      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>{e.buyWhere}</div>
      ))}
      {ProductStoreImpl.products.map((e) => (
        <div key={e.id}>{e.replacement}</div>
      ))}
      <button onClick={open}>Добавить</button>
    </div>
  );
});
