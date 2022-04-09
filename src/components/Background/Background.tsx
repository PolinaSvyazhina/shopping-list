import React from 'react';
import classes from './Background.module.css';

export const Background = () => {
  const arrayOfDiv = [];
  const columns = 8;
  for (let i = 0; i < columns; i++) arrayOfDiv.push(<div key={i} className={classes.column} />);
  return (
    <div>
      <div className={classes.background}>{arrayOfDiv}</div>
    </div>
  );
};
