import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../containers/ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';
import { Empty } from '../components/Empty';
import { Button } from '../components/Button';
import { DownloadButton } from '../components/DownloadButton';
import { CardProduct } from '../components/CardProduct';
import { Delete } from '../components/Delete';
import { FilterByPlace } from '../components/FilterByPlace';
import classes from './Main.module.css';
import { ProductModel } from 'src/models/ProductStore.types';
import { SelectFilterMark } from '../components/SelectFilterMark';
import { SelectValue } from '../components/SelectFilterMark/SelectFilterMark';
import DataIcon from '../Main/icons/Data.svg';

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

  function onChangeFilter(e: SelectValue) {
    if (e.value === 'showAll') {
      ProductStoreImpl.setFilter(null);
    } else if (e.value === 'purchased') {
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
            <div className={classes.dataText} onClick={sortData}>
              <DataIcon /> По дате добавления
            </div>
            <SelectFilterMark onChange={onChangeFilter} />
            <FilterByPlace getPlaces={(value: Array<string>) => setFilterValueByPlace(value)} />
          </div>
          <Button onClick={() => openProductEditorModal(null)}>Добавить</Button>
        </div>
        {ProductStoreImpl.getProducts.length === 0 ? (
          <Empty />
        ) : (
          <div className={classes.cards}>
            {ProductStoreImpl.getProducts.map((e: ProductModel) => (
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
                setMarkedList={() => ProductStoreImpl.markProduct(e.id)}
                isMarked={() => ProductStoreImpl.isMarked(e.id)}
              />
            ))}
          </div>
        )}
        <div className={classes.bottomMenu}>
          <div style={{ display: `flex`, alignItems: `flex-end` }}>
            <div style={{ marginRight: 8 }}>
              <div className={classes.line} />
              <p className="titleMedium">Итого</p>
              <h1 className={classes.total}>{ProductStoreImpl.getTotal()}р.</h1>
            </div>
            <DownloadButton />
            <div />
          </div>
          <Delete remove={remove} removeAll={removeAll} style={{ alignSelf: `flex-end` }} />
        </div>
      </div>
    </div>
  );
});
