import React, { useState } from 'react';
import classes from './ProductsSortSelect.module.css';
import { SelectValueSort } from '../SelectValue';
import SortIcon from '../../../Main/icons/Sort.svg';

interface ProductSortSelectProps {
  onChange?: (newSelections: SelectValueSort) => void;
}

const titleList = [
  { id: 0, title: 'По дате добавления', name: 'Новее' },
  { id: 1, title: 'По дате добавления', name: 'Старее' },
  { id: 2, title: 'По цене', name: 'Дешевле' },
  { id: 3, title: 'По цене', name: 'Дороже' },
  { id: 4, title: 'По алфавиту', name: 'А - Я' },
  { id: 5, title: 'По алфавиту', name: 'Я - А' },
  { id: 6, title: 'По дате покупки', name: 'Скоро' },
  { id: 7, title: 'По дате покупки', name: 'Позже' },
];

export const ProductsSortSelect: React.FC<ProductSortSelectProps> = ({ onChange }) => {
  const [show, setShow] = useState(false);
  const [titleId, setTitleId] = useState(0);

  if (show) {
    document.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(document.querySelector('#buttonList'));
      const noMainButton = e.composedPath().includes(document.querySelector('#mainButton'));
      if (!withinBoundaries && !noMainButton) {
        setShow(!show);
      }
    });
  }

  return (
    <div className={classes.sort}>
      {titleId % 2 === 1 ? <SortIcon /> : <SortIcon className={classes.image} />}
      <div className={classes.buttons}>
        <button
          id="mainButton"
          className={classes.mainButton}
          onClick={() => {
            setShow(!show);
          }}
        >
          {titleList[titleId].title}
        </button>
        {show && (
          <div id="buttonList" className={classes.buttonList}>
            {titleList.map((obj) => (
              <button
                key={obj.id}
                onClick={() => {
                  onChange(obj);
                  setTitleId(obj.id);
                  setShow(!show);
                }}
                className={classes.button}
              >
                {obj.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
