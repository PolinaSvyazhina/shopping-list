import React from 'react';

export const Background = () => {
  const arrayOfDiv = [];
  for (let i = 0; i < 8; i++)
    arrayOfDiv.push(
      <div
        key={i}
        style={{
          width: 15,
          height: '100vh',
          background: `linear-gradient(#E9EEF1, #DCE0E3)`,
          boxShadow: `-5px -12px 20px -4px #B2C2D2 inset, 5px 15px 20px 10px #E9F2FB inset`,
        }}
      />
    );
  return (
    <div>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          background: `linear-gradient(#E9EEF1, #DCE0E3)`,
          display: 'flex',
          justifyContent: 'space-evenly',
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      >
        {arrayOfDiv}
      </div>
    </div>
  );
};
