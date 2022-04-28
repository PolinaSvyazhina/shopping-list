import React from 'react';
import classes from './DownloadButton.module.css';
import { headers } from './DownloadButton.constants';
import { Button } from '../Button';
import { CSVLink } from 'react-csv';
import DownloadIcon from '../../Main/icons/Download.svg';
import { ProductModel } from '../../models/ProductStore.types';

export interface DownloadButtonProps {
  products: Array<ProductModel>;
}

export const DownloadButton = (props: DownloadButtonProps) => {
  return (
    <CSVLink className={classes.link} headers={headers} data={props.products} filename="My_shopping_list.csv">
      <Button className={classes.downloadButton}>
        <DownloadIcon />
        Выгрузить список
      </Button>
    </CSVLink>
  );
};
