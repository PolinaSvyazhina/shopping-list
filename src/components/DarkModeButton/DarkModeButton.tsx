import React, { useState } from 'react';
import classes from './DarkModeButton.module.css';
import MoonIcon from '../../Main/icons/Moon.svg';
import SunIcon from '../../Main/icons/Sun.svg';

export const DarkModeButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  const [mode, setMode] = useState(true);
  return (
    <button
      onClick={() => {
        document.body.classList.toggle('dark-theme');
        setMode(!mode);
      }}
      className={classes.button}
    >
      {mode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
