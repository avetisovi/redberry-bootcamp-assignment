import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils';

import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopProperties = ({ stats }) => {
  const [formatedStats, setFormatedStats] = useState([]);
  const [brands, setBrands] = useState([]);

  // fetching teams and positions
  useEffect(() => {
    fetchData('https://pcfy.redberryinternship.ge/api/brands').then(setBrands);
  }, []);

  // setting formated data
  useEffect(() => {
    let brand = '';

    if (stats.brand_id && brands.length) {
      const brandObj = brands.find((opt) => opt.id === stats.brand_id);
      brand = brandObj.name;
    }

    setFormatedStats([
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
      {formatedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="firstColumn" />
      ))}
    </div>
  );
};

export default LaptopProperties;
