import React, { useState, useEffect } from 'react';
import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopPurchaseDate = ({ stat }) => {
  const [formatedStat, setFormatedStat] = useState(['', '']);

  useEffect(() => {
    if (stat) {
      setFormatedStat(['შეძენის რიცხვი', stat.split('-').join(' / ')]);
    } else {
      setFormatedStat(['შეძენის რიცხვი', 'არ არის მითითებული']);
    }
  }, [stat]);
  return (
    <div className="laptop__purchase">
      <LaptopOption stat={formatedStat} className="secondColumn" />
    </div>
  );
};

export default LaptopPurchaseDate;
