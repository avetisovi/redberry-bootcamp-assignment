import React, { useState, useEffect } from 'react';
import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopCpu = ({ stats }) => {
  const [formatedStats, setFormatedStats] = useState([]);

  // setting formated data
  useEffect(() => {
    setFormatedStats([
      ['CPU', stats.name],
      ['CPU-ს ბირთვი', stats.cores],
      ['CPU-ს ნაკადი', stats.threads]
    ]);
  }, [stats]);
  return (
    <div className="laptop__cpu">
      {formatedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="secondColumn" />
      ))}
    </div>
  );
};

export default LaptopCpu;
