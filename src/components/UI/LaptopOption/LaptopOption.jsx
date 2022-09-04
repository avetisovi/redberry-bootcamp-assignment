import React from 'react';

import cl from './LaptopOption.module.css';

const LaptopOption = ({ stat, className }) => {
  return (
    <div className={cl.laptopOption + ' ' + cl[className]}>
      <p className={cl.laptopOptionTitle}>{stat[0]}:</p>
      <p className={cl.laptopOptionDesc}>{stat[1]}</p>
    </div>
  );
};

export default LaptopOption;
