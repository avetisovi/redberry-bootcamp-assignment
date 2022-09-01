import React, { useState, useEffect } from 'react';
import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopPurchase = ({ stats }) => {
  const [formatedStats, setFormatedStats] = useState([]);

  // setting formated data
  useEffect(() => {
    let laptopState = '';

    if (stats.state === 'new') {
      laptopState = 'ახალი';
    }

    if (stats.state === 'used') {
      laptopState = 'მეორადი';
    }
    setFormatedStats([
      ['ლეპტოპის მდგომარეობა', laptopState],
      ['ლეპტოპის ფასი', `${stats.price} ₾`]
    ]);
  }, [stats]);
  return (
    <div className="laptop__purchase">
      {formatedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="firstColumn" />
      ))}
    </div>
  );
};

export default LaptopPurchase;
