import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../containers/ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';
import { Empty } from '../components/Empty';
import { Button } from '../components/Button';
import { DownloadButton } from '../components/DownloadButton';
import { CardProduct } from '../components/CardProduct';
import { Delete } from '../components/Delete';
import { DarkModeButton } from '../components/DarkModeButton';
import { PurchasePlaceProductFilterSelect } from '../components/Selects/PurchasePlaceProductFilterSelect';
import classes from './Main.module.css';
import { ProductModel } from 'src/models/ProductStore.types';
import { ProductPurchaseSelect } from '../components/Selects/ProductPurchaseSelect';
import SortIcon from '../Main/icons/Sort.svg';
import { ProductsAggregationStoreImpl } from '../models/ProductsAggregationStore';
import { ProductsSortSelect } from '../components/Selects/ProductsSortSelect/ProductsSortSelect';
import { onChangeProductsSortSelect } from '../components/Selects/ProductsSortSelect/onChangeProductsSortSelect';
import { PurchasePlaceProductFilter } from '../models/Filters/Filters';
import { onChangeProductPurchaseSelect } from '../components/Selects/ProductPurchaseSelect/onChangeProductPurchaseSelect';
import { getProductsTotalAmount } from './getProductsTotalAmount';

export const Main = observer(() => {
  const [opened, setOpened] = useState(false);
  const [initCardValues, setInitCardValue] = useState(null);
  const [purchaseSelectedPlaces, setPurchaseSelectedPlaces] = useState<string[]>([]);
  useEffect(() => {
    if (purchaseSelectedPlaces.length === 0) {
      ProductsAggregationStoreImpl.removePurchasePlaceProductFilter();
    } else {
      ProductsAggregationStoreImpl.setPurchasePlaceProductFilter(
        new PurchasePlaceProductFilter(purchaseSelectedPlaces)
      );
    }
  }, [purchaseSelectedPlaces]);

  function openProductEditorModal(elem: ProductModel) {
    setInitCardValue(elem);
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  function remove() {
    for (const product of ProductStoreImpl.getProducts.filter((product) => product.purchased)) {
      ProductStoreImpl.removeProduct(product.id);
    }
  }

  function removeAll() {
    ProductStoreImpl.removeAllProducts();
  }

  const products = ProductStoreImpl.getProducts;
  const aggregatedProducts =
    products.length === 0 ? products : ProductsAggregationStoreImpl.getProductAggregation()(products);

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={classes.dataText}>
              <SortIcon />
              <ProductsSortSelect onChange={onChangeProductsSortSelect} />
            </p>
            <ProductPurchaseSelect onChange={onChangeProductPurchaseSelect} />
            <PurchasePlaceProductFilterSelect getPlaces={(value: Array<string>) => setPurchaseSelectedPlaces(value)} />
          </div>
          <Button className={classes.addButton} onClick={() => openProductEditorModal(null)}>
            Добавить
          </Button>
        </div>
        {aggregatedProducts.length === 0 ? (
          <Empty />
        ) : (
          <div className={classes.cards}>
            {aggregatedProducts.map((product: ProductModel) => (
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
                setMarkedList={() => ProductStoreImpl.purchaseProduct(product.id)}
                isMarked={() => ProductStoreImpl.isPurchased(product.id)}
              />
            ))}
          </div>
        )}
        <footer className={classes.bottomMenu}>
          <div style={{ display: `flex`, alignItems: `flex-end` }}>
            <div style={{ marginRight: 8 }}>
              <div className={classes.line} />
              <p className="titleMedium">Итого</p>
              <h1 className={classes.total}>{getProductsTotalAmount(aggregatedProducts)}р.</h1>
            </div>
            <DownloadButton />
            <div />
          </div>
          <Delete remove={remove} removeAll={removeAll} style={{ alignSelf: `flex-end` }} />
        </footer>
      </div>
      <DarkModeButton />
    </div>
  );
});
