import React from 'react';

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
          <Svg />
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </button>
  );
};

const Svg = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="19" rx="2.5" stroke="#EFF4FA" />
      <path
        d="M9.64645 14.3536C9.84171 14.5488 10.1583 14.5488 10.3536 14.3536L13.5355 11.1716C13.7308 10.9763 13.7308 10.6597 13.5355 10.4645C13.3403 10.2692 13.0237 10.2692 12.8284 10.4645L10 13.2929L7.17157 10.4645C6.97631 10.2692 6.65973 10.2692 6.46447 10.4645C6.2692 10.6597 6.2692 10.9763 6.46447 11.1716L9.64645 14.3536ZM9.5 1L9.5 14L10.5 14L10.5 1L9.5 1Z"
        fill="#EFF4FA"
      />
    </svg>
  );
};
