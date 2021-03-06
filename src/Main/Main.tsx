import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductEditorModal } from '../ProductEditorModal';
import { ProductStoreImpl } from '../models/ProductStore';
import { Empty } from '../components/Empty';
import { Button } from '../components/Button';
import { DownloadButton } from '../components/DownloadButton';
import { CardProduct } from '../components/CardProduct';
import { Delete } from '../components/Delete';
import { DarkModeButton } from '../components/DarkModeButton';
import { BuyingPlaceProductFilterSelect } from '../components/Selects/BuyingBuyingProductFilterSelect';
import classes from './Main.module.css';
import { ProductModel } from 'src/models/ProductStore.types';
import { ProductBuyingSelect } from '../components/Selects/ProductBuyingSelect';
import { ProductsAggregationStoreImpl } from '../models/ProductsAggregationStore';
import { ProductsSortSelect } from '../components/Selects/ProductsSortSelect/ProductsSortSelect';
import { onChangeProductsSortSelect } from '../components/Selects/ProductsSortSelect/onChangeProductsSortSelect';
import { BuyingPlaceProductFilter } from '../models/Filters/Filters';
import { onChangeProductBuying } from '../components/Selects/ProductBuyingSelect/onChangeProductBuying';
import { getProductsTotalAmount } from './getProductsTotalAmount';
import { getBuyingPlaceProductFilterSelectOptions } from '../components/Selects/BuyingBuyingProductFilterSelect/getBuyingPlaceProductFilterSelectOptions';

export const Main = observer(() => {
  const [opened, setOpened] = useState(false);
  const [initCardValues, setInitCardValue] = useState(null);
  const [purchaseSelectedPlaces, setPurchaseSelectedPlaces] = useState<string[]>([]);
  useEffect(() => {
    if (purchaseSelectedPlaces.length === 0) {
      ProductsAggregationStoreImpl.removePurchasePlaceProductFilter();
    } else {
      ProductsAggregationStoreImpl.setPurchasePlaceProductFilter(new BuyingPlaceProductFilter(purchaseSelectedPlaces));
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
    for (const product of ProductStoreImpl.getProducts.filter((product) => product.bought)) {
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
        <h1>???????????? ??????????????</h1>
        <div className={classes.menu}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProductsSortSelect onChange={onChangeProductsSortSelect} />
            <ProductBuyingSelect onChange={onChangeProductBuying} />
            <BuyingPlaceProductFilterSelect
              getPlaces={(value: Array<string>) => setPurchaseSelectedPlaces(value)}
              placesForOptions={getBuyingPlaceProductFilterSelectOptions(products)}
            />
          </div>
          <Button className={classes.addButton} onClick={() => openProductEditorModal(null)}>
            ????????????????
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
                switchBoughtProduct={() => ProductStoreImpl.switchBoughtProduct(product.id)}
                isBought={() => ProductStoreImpl.isBought(product.id)}
              />
            ))}
          </div>
        )}
        <footer className={classes.bottomMenu}>
          <div style={{ display: `flex`, alignItems: `flex-end` }}>
            <div style={{ marginRight: 8 }}>
              <div className={classes.line} />
              <p className="titleMedium">??????????</p>
              <h1 className={classes.total}>{getProductsTotalAmount(aggregatedProducts)}??.</h1>
            </div>
            <DownloadButton products={aggregatedProducts} />
            <div />
          </div>
          <Delete remove={remove} removeAll={removeAll} style={{ alignSelf: `flex-end` }} />
        </footer>
      </div>
      <DarkModeButton />
    </div>
  );
});
