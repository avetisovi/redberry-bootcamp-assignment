import React, { useState, useEffect } from 'react';
import { getData } from '../../utils';

import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopProperties = ({ stats }) => {
  const [formattedStats, setFormattedStats] = useState([]);
  const [brands, setBrands] = useState([]);

  // fetching brands
  useEffect(() => {
    getData('https://pcfy.redberryinternship.ge/api/brands').then(setBrands);
  }, []);

  // waiting stats to fetch to format data
  useEffect(() => {
    let brand = '';

    // setting brand name
    if (stats.brand_id && brands.length) {
      const brandObj = brands.find((opt) => opt.id === stats.brand_id);
      brand = brandObj.name;
    }

    // setting formatted data
    setFormattedStats([
      ['ლეპტოპის სახელი', stats.name],
      ['ლეპტოპის ბრენდი', brand],
      ['RAM', stats.ram],
      ['მეხსიერების ტიპი', stats.hard_drive_type]
    ]);
  }, [stats]);
  return (
    <div
      className="laptop__properties
    "
    >
      {formattedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="firstColumn" />
      ))}
    </div>
  );
};

export default LaptopProperties;
