import classes from './ProductInfo.module.css';
import React from 'react';
import { MeasurementUnits, ProductModel } from '../../models/ProductStore.types';

interface ProductEditorProps {
  stateProduct: ProductModel;
}

export const ProductInfo: React.FC<ProductEditorProps> = ({ stateProduct }) => {
  function formatDate(thisData: Date) {
    const date: Date = new Date(thisData);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  return (
    <form className={classes.container}>
      <div className={classes.form}>
        <div>
          <p className={`titleSmall ${classes.title}`}>Количество</p>
          <p>
            {stateProduct.count}
            {stateProduct.measurementUnits}
          </p>
        </div>
        {stateProduct.measurementUnits === MeasurementUnits.Grams && (
          <div>
            <p className={`titleSmall ${classes.title}`}>Цена за кг</p>
            {stateProduct.price ? <p>{stateProduct.price * 1000}</p> : <p>—</p>}
          </div>
        )}
        {stateProduct.measurementUnits === MeasurementUnits.Milliliters && (
          <div>
            <p className={`titleSmall ${classes.title}`}>Цена за литр</p>
            {stateProduct.price ? <p>{stateProduct.price * 1000}</p> : <p>—</p>}
          </div>
        )}
        {stateProduct.measurementUnits === MeasurementUnits.Pieces && (
          <div>
            <p className={`titleSmall ${classes.title}`}>Цена за шт</p>
            {stateProduct.price ? <p>{stateProduct.price}</p> : <p>—</p>}
          </div>
        )}
        <div className={classes.thirdElement}>
          <p className={`titleSmall ${classes.title}`}>Примерная цена</p>
          {stateProduct.totalPrice ? <p>{stateProduct.totalPrice}</p> : <p>—</p>}
        </div>
        <div className={classes.fourthElement}>
          <p className={`titleSmall ${classes.title}`}>К какому числу</p>
          {stateProduct.date ? <p>{formatDate(stateProduct.date)}</p> : <p>—</p>}
        </div>
        <div className={classes.fifthElement}>
          <p className={`titleSmall ${classes.title}`}>Где купить</p>
          {stateProduct.buyWhere ? <p>{stateProduct.buyWhere}</p> : <p>—</p>}
        </div>
        <div className={classes.lastElement}>
          <p className={`titleSmall ${classes.title}`}>Замены</p>
          {stateProduct.replacement ? <p>{stateProduct.replacement}</p> : <p>—</p>}
        </div>
      </div>
    </form>
  );
};
