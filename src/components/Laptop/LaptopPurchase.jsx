import React, { useState, useEffect } from 'react';
import LaptopOption from './UI/LaptopOption/LaptopOption';

const LaptopPurchase = ({ stats }) => {
  const [formattedStats, setFormattedStats] = useState([]);

  // waiting stats to fetch to format data
  useEffect(() => {
    let laptopState = '';

    // setting laptop state
    if (stats.state === 'new') {
      laptopState = 'ახალი';
    }

    if (stats.state === 'used') {
      laptopState = 'მეორადი';
    }

    // setting formatted data
    setFormattedStats([
      ['ლეპტოპის მდგომარეობა', laptopState],
      ['ლეპტოპის ფასი', `${stats.price} ₾`]
    ]);
  }, [stats]);
  return (
    <div className="laptop__purchase">
      {formattedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="firstColumn" />
      ))}
    </div>
  );
};

export default LaptopPurchase;
