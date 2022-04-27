import clsx from 'clsx';
import React from 'react';
import classes from './Button.module.css';

export const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return <button className={clsx(classes.button, className)} {...props} />;
};
