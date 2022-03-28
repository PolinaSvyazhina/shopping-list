import React from 'react';
import { Main } from './Main/Main';

import classes from './App.module.css';

export function App() {
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <Main />
      </header>
    </div>
  );
}
