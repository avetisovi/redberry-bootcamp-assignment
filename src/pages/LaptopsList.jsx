import React, { useState, useEffect } from 'react';
import LaptopListItem from '../components/Laptop/LaptopListItem';
import BackBtn from '../components/BackBtn';
import { getData } from '../utils';

const LaptopsList = () => {
  const [laptops, setLaptops] = useState([]);

  // fetching laptops list and then parsing it to laptops array
  useEffect(() => {
    getData(
      `https://pcfy.redberryinternship.ge/api/laptops?token=${process.env.REACT_APP_TOKEN}`
    ).then(setLaptops);
  }, []);

  document.querySelector('body').style.overflow = 'auto';

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
