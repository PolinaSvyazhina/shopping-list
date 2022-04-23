import classes from './ProductInfo.module.css';
import React from 'react';
import { ProductModel } from '../../models/ProductStore.types';

interface ProductEditorProps {
  stateProduct: ProductModel;
}

export const ProductInfo: React.FC<ProductEditorProps> = ({ stateProduct }) => {
  function formatDate(thisData: Date) {
    const date: Date = new Date(thisData);
    const stringDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return stringDate;
  }

  return (
    <form className={classes.container}>
      <div className={classes.form}>
        <div className={classes.fullWidthElement}>
          <p className={`titleSmall ${classes.title}`}>Количество</p>
          <p>
            {stateProduct.count}
            {stateProduct.measurementUnits}
          </p>
        </div>
        <div>
          <p className={`titleSmall ${classes.title}`}>Цена за {stateProduct.measurementUnits}</p>
          {stateProduct.price ? <p>{stateProduct.price}</p> : <p>—</p>}
        </div>
        <div>
          <p className={`titleSmall ${classes.title}`}>Примерная цена</p>
          {stateProduct.price ? <p>{Number(stateProduct.count) * Number(stateProduct.price)}</p> : <p>—</p>}
        </div>
        <div>
          <p className={`titleSmall ${classes.title}`}>К какому числу</p>
          {stateProduct.date ? <p>{formatDate(stateProduct.date)}</p> : <p>—</p>}
        </div>
        <div className={classes.fullWidthElement}>
          <p className={`titleSmall ${classes.title}`}>Где купить</p>
          {stateProduct.buyWhere ? <p>{stateProduct.buyWhere}</p> : <p>—</p>}
        </div>
        <div>
          <p className={`titleSmall ${classes.title}`}>Замены</p>
          {stateProduct.replacement ? <p>{stateProduct.replacement}</p> : <p>—</p>}
        </div>
      </div>
    </form>
  );
};
