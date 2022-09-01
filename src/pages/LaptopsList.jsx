import React, { useState, useEffect } from 'react';
import LaptopListItem from '../components/Laptop/LaptopListItem';
import BackBtn from '../components/BackBtn';
import { fetchData } from '../utils';

const LaptopsList = () => {
  const [laptops, setLaptops] = useState([]);
  useEffect(() => {
    fetchData(
      'https://pcfy.redberryinternship.ge/api/laptops?token=ab09d65821320a72cc4969433abaaebf'
    ).then(setLaptops);
  }, []);

  return (
    <div className="laptop">
      <BackBtn />
      <div className="container">
        <h1 className="laptop__title">{'ჩანაწერების სია'.toUpperCase()}</h1>
        <ul className="laptops__list">
          {laptops.map((laptop) => (
            <LaptopListItem key={laptop.laptop.id} data={laptop} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LaptopsList;
