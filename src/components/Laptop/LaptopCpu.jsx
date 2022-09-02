import React, { useState, useEffect } from 'react';
import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopCpu = ({ stats }) => {
  const [formattedStats, setFormattedStats] = useState([]);

  // waiting stats to fetch to format data
  useEffect(() => {
    // setting formatted data
    setFormattedStats([
      ['CPU', stats.name],
      ['CPU-ს ბირთვი', stats.cores],
      ['CPU-ს ნაკადი', stats.threads]
    ]);
  }, [stats]);
  return (
    <div className="laptop__cpu">
      {formattedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="secondColumn" />
      ))}
    </div>
  );
};

export default LaptopCpu;
