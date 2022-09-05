import React, { useState, useEffect } from 'react';
import LaptopOption from './UI/LaptopOption/LaptopOption';

const LaptopPurchaseDate = ({ stat }) => {
  const [formattedStat, setFormattedStat] = useState(['', '']);

  // waiting stats to fetch to format data
  useEffect(() => {
    // formatting purchase date
    if (stat) {
      setFormattedStat(['შეძენის რიცხვი', stat.split('-').join(' / ')]);
    } else {
      setFormattedStat(['შეძენის რიცხვი', 'არ არის მითითებული']);
    }
  }, [stat]);
  return (
    <div className="laptop__purchaseDate">
      <LaptopOption stat={formattedStat} className="secondColumn" />
    </div>
  );
};

export default LaptopPurchaseDate;
