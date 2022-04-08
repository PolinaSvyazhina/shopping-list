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
    <div className={classes.background}>
      <div className={classes.backtacks}>
        <div className={classes.backtack} />
        <div className={classes.backtack} />
      </div>
      {opened && <ProductEditorModal onClose={close} />}
      <div className={classes.workspace}>
        <h1>Список покупок</h1>
        <div className={classes.menu}>
          <div>
            {/* Сортировка и две фильтрации */}
            <div />
            <div />
            <div />
          </div>
          <Button onClick={open}>Добавить</Button>
        </div>
        {ProductStoreImpl.products.length === 0 ? (
          <Empty />
        ) : (
          <div className={classes.cards}>
            {ProductStoreImpl.products.map((e) => (
              <CardProduct
                key={e.id}
                id={e.id}
                name={e.name}
                count={e.count}
                measurementUnits={e.measurementUnits}
                price={e.price}
                buyWhere={e.buyWhere}
                replacement={e.replacement}
                isChecked={false}
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
          <Delete style={{ alignSelf: `flex-end` }} />
        </div>
      </div>
    </div>
  );
});
