import React from 'react';
import EmptyImage from '../../images/EmptyImage.png';
import classes from './Empty.module.css';

export const Empty = () => {
  return (
    <div className={classes.position}>
      <h1>Пусто...</h1>
      <img src={EmptyImage} alt="Грустный лисенок" />
    </div>
  );
};
