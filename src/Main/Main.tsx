import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../containers/ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';

import { Empty } from '../components/Empty';
import { Button } from '../components/Button';
import { CardProduct } from '../components/CardProduct';
import { Delete } from '../components/Delete';
import DownloadIcon from './icons/Download.svg';

import classes from './Main.module.css';
import { ProductModel } from 'src/models/ProductStore.types';

export const Main = observer(() => {
  const [markedList, setMarkedList] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);
  const [initCardValues, setInitCardValue] = useState(null);

  function openProductEditorModal(elem: ProductModel) {
    setInitCardValue(elem);
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  function remove() {
    for (const i of markedList) {
      ProductStoreImpl.removeProduct(i);
    }
  }

  function removeAll() {
    ProductStoreImpl.removeAllProducts();
  }

  function sortData() {
    ProductStoreImpl.sortDataProducts();
  }

  return (
    <div className={classes.background}>
      <div className={classes.backtacks}>
        <div className={classes.backtack} />
        <div className={classes.backtack} />
      </div>
      {opened && <ProductEditorModal onClose={close} initValues={initCardValues} />}
      <div className={classes.workspace}>
        <h1>Список покупок</h1>
        <div className={classes.menu}>
          <div>
            <Button onClick={sortData}> По времени</Button>
            {/* Сортировка и две фильтрации */}
            <div />
            <div />
            <div />
          </div>
          <Button onClick={() => openProductEditorModal(null)}>Добавить</Button>
        </div>
        {ProductStoreImpl.getProducts.length === 0 ? (
          <Empty />
        ) : (
          <div className={classes.cards}>
            {ProductStoreImpl.getProducts.map((e) => (
              <CardProduct
                onClick={() => openProductEditorModal(e)}
                key={e.id}
                id={e.id}
                name={e.name}
                count={e.count}
                measurementUnits={e.measurementUnits}
                price={e.price}
                buyWhere={e.buyWhere}
                replacement={e.replacement}
                isChecked={false}
                setMarkedList={() => setMarkedList((state) => [...state, e.id])}
              />
            ))}
          </div>
        )}
        <div className={classes.bottomMenu}>
          <div style={{ display: `flex` }}>
            <div style={{ marginRight: 8 }}>
              <div className={classes.line} />
              <p className="titleMedium">Итого</p>
              <h1 className={classes.total}>{ProductStoreImpl.getTotal()}р.</h1>
            </div>
            <Button className={classes.downloadButton}>
              <DownloadIcon />
              Выгрузить список
            </Button>
            <div />
          </div>
          <Delete remove={remove} removeAll={removeAll} style={{ alignSelf: `flex-end` }} />
        </div>
      </div>
    </div>
  );
});
