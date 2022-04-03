import React from 'react';
import { DownloadSvg } from '../../images/DownloadSvg';
import classes from './Button.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  unloading?: boolean;
  red?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, unloading, red, ...rest } = props;

  return (
    <button className={unloading ? classes.buttonUnloading : red ? classes.redButton : classes.button} {...rest}>
      {unloading ? (
        <div style={{ display: `flex`, alignItems: `center`, justifyContent: `space-around` }}>
          <DownloadSvg />
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </button>
  );
};
