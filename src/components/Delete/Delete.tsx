import React, { useState } from 'react';

import classes from './Delete.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

export const Delete: React.FC<ButtonProps> = (props) => {
  const { ...rest } = props;
  const [show, setShow] = useState(false);
  const whiteColor = '#EFF4FA';
  const redColor = '#F46770';
  return (
    <div className={classes.position}>
      <button
        onClick={() => {
          setShow(!show);
        }}
        className={classes.button}
        {...rest}
      >
        <CheckMarkIcon color={show ? redColor : whiteColor} />
      </button>
      {show && (
        <div className={classes.buttons}>
          <button className={classes.buttonDelete}>Удалить отмеченные</button>
          <button className={classes.buttonDelete}>Удалить все</button>
        </div>
      )}
    </div>
  );
};

const CheckMarkIcon = (props: { color: string }) => {
  return (
    <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 1C16.2091 1 18 2.79086 18 4.99999L8 5C8 2.79086 9.79086 1 12 1L14 1Z"
        fill={props.color}
        stroke="#5A6B7F"
        strokeWidth="2"
      />
      <rect
        x="25"
        y="5"
        width="4.00001"
        height="24"
        rx="2"
        transform="rotate(90 25 5)"
        fill={props.color}
        stroke="#5A6B7F"
        strokeWidth="2"
      />
      <path
        d="M23 9L23 27C23 29.2091 21.2091 31 19 31L7 31C4.79086 31 3 29.2091 3 27L3 9L23 9Z"
        fill={props.color}
        stroke="#5A6B7F"
        strokeWidth="2"
      />
      <line x1="7.84246" y1="14.968" x2="8.15655" y2="23.9625" stroke="#5A6B7F" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="15" x2="13" y2="24" stroke="#5A6B7F" strokeWidth="2" strokeLinecap="round" />
      <line
        x1="1"
        y1="-1"
        x2="9.99999"
        y2="-1"
        transform="matrix(-0.0349004 0.999391 -0.999391 -0.0348986 17.1919 14.0038)"
        stroke="#5A6B7F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
