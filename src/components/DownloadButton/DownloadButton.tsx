import React from 'react';
import classes from './DownloadButton.module.css';
import { headers } from './DownloadButton.constants';
import { Button } from '../Button';
import { ProductStoreImpl } from '../../models/ProductStore';
import { CSVLink } from 'react-csv';
import DownloadIcon from '../../Main/icons/Download.svg';

export const DownloadButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <CSVLink
      className={classes.link}
      headers={headers}
      data={ProductStoreImpl.getProducts}
      filename="My_shopping_list.csv"
    >
      <Button className={classes.downloadButton}>
        <DownloadIcon />
        Выгрузить список
      </Button>
    </CSVLink>
  );
};
