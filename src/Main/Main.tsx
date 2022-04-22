import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../containers/ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';
import { Empty } from '../components/Empty';
import { Button } from '../components/Button';
import { CardProduct } from '../components/CardProduct';
import { Delete } from '../components/Delete';
import { FilterByPlace } from '../components/FilterByPlace';
import DownloadIcon from './icons/Download.svg';
import classes from './Main.module.css';
import { ProductModel } from 'src/models/ProductStore.types';

export const Main = observer(() => {
  const [opened, setOpened] = useState(false);
  const [initCardValues, setInitCardValue] = useState(null);
  const [filterValueByPlace, setFilterValueByPlace] = useState([]);
  useEffect(() => ProductStoreImpl.setPlaces(filterValueByPlace), [filterValueByPlace]);

  function openProductEditorModal(elem: ProductModel) {
    setInitCardValue(elem);
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  function remove() {
    const oldFilter = ProductStoreImpl.isMarkedFilter;
    ProductStoreImpl.setFilter(true);
    for (const i of ProductStoreImpl.getProducts) {
      ProductStoreImpl.removeProduct(i.id);
    }
    ProductStoreImpl.setFilter(oldFilter);
  }

  function removeAll() {
    ProductStoreImpl.removeAllProducts();
  }

  function sortData() {
    ProductStoreImpl.sortDataProducts();
  }

  function onChangeFilter(e: ChangeEvent<HTMLSelectElement>) {
    if (e.currentTarget.value === 'showAll') {
      ProductStoreImpl.setFilter(null);
    } else if (e.currentTarget.value === 'purchased') {
      ProductStoreImpl.setFilter(true);
    } else {
      ProductStoreImpl.setFilter(false);
    }
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
          <div style={{ display: 'flex' }}>
            <Button onClick={sortData}> По времени</Button>
            <select onChange={onChangeFilter}>
              <option value={'showAll'}>Показать всё</option>
              <option value={'purchased'}>Купленные</option>
              <option value={'unpurchased'}>Не купленные</option>
            </select>
            <FilterByPlace getPlaces={(value: Array<string>) => setFilterValueByPlace(value)} />
          </div>
          <Button onClick={() => openProductEditorModal(null)}>Добавить</Button>
        </div>
        {ProductStoreImpl.getProducts.length === 0 ? (
          <Empty />
        ) : (
          <div className={classes.cards}>
            {ProductStoreImpl.getProducts.map((product: ProductModel) => (
              <CardProduct
                onClick={() => openProductEditorModal(product)}
                key={product.id}
                id={product.id}
                name={product.name}
                count={product.count}
                measurementUnits={product.measurementUnits}
                totalPrice={product.totalPrice}
                buyWhere={product.buyWhere}
                replacement={product.replacement}
                isChecked={false}
                setMarkedList={() => ProductStoreImpl.markProduct(product.id)}
                isMarked={() => ProductStoreImpl.isMarked(product.id)}
              />
            ))}
          </div>
        )}
        <div className={classes.bottomMenu}>
          <div style={{ display: `flex` }}>
            <div style={{ marginRight: 8 }}>
              <div className={classes.line} />
              <p className="titleMedium">Итого</p>
              <h1 className={classes.total}>{ProductStoreImpl.totalAmount}р.</h1>
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
