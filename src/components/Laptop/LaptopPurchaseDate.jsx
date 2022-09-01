import React, { useState, useEffect } from 'react';
import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopPurchaseDate = ({ stat }) => {
  const [formatedStat, setFormatedStat] = useState(['', '']);

  useEffect(() => {
    if (stat) {
      setFormatedStat(['შეძენის რიცხვი', stat.split('-').join(' / ')]);
    } else {
      setFormatedStat(['შეძენის რიცხვი', '']);
    }
  }, [stat]);
  return (
    <div>
      <LaptopOption stat={formatedStat} className="secondColumn" />
    </div>
  );
};

export default LaptopPurchaseDate;
