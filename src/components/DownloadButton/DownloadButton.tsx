import React from 'react';
import classes from './DownloadButton.module.css';
import { Button } from '../Button';
import { ProductStoreImpl } from '../../models/ProductStore';
import { CSVLink } from 'react-csv';
import DownloadIcon from '../../Main/icons/Download.svg';
import { MeasurementUnitsType } from 'src/models/ProductStore.types';

export const DownloadButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  const headers = [
    { label: 'Название', key: 'name' },
    { label: 'Количество', key: 'count' },
    { label: 'Цена за', key: 'price' },
    { label: 'Единица измерения', key: 'measurementUnits' },
    { label: 'Примерная цена', key: 'totalPrice' },
    { label: 'Дата', key: 'date' },
    { label: 'Место', key: 'place' },
    { label: 'Замена', key: 'replacement' },
    { label: 'Куплено', key: 'marked' },
  ];

  const products = ProductStoreImpl.getProducts;

  const data = [];

  type Data = {
    name?: string;
    count?: number;
    price?: number;
    measurementUnits?: MeasurementUnitsType;
    totalprice?: number;
    date?: Date;
    place?: string;
    replacement?: string;
    marked?: boolean;
  };

  for (let i = 0; i < products.length; i++) {
    const obj: Data = new Object();
    obj.name = products[i].name;
    obj.count = products[i].count;
    obj.price = products[i].price;
    obj.measurementUnits = products[i].measurementUnits;
    obj.totalprice = products[i].price;
    obj.date = products[i].date;
    obj.place = products[i].buyWhere;
    obj.replacement = products[i].replacement;
    obj.marked = products[i].marked;
    data.push(obj);
  }

  const csvReport = {
    headers: headers,
    data: data,
    filename: 'My_shopping_list.csv',
  };

  return (
    <CSVLink className={classes.link} {...csvReport}>
      <Button className={classes.downloadButton}>
        <DownloadIcon />
        Выгрузить список
      </Button>
    </CSVLink>
  );
};
