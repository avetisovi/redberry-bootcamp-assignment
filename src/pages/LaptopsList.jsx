import React, { useContext } from 'react';
import LaptopListItem from '../components/Laptop/LaptopListItem';
import { LaptopsContext } from '../context';
import BackBtn from '../components/BackBtn';

const LaptopsList = () => {
  const { laptops } = useContext(LaptopsContext);
  return (
    <div className="laptops">
      <BackBtn />
      <div className="container">
        <h1 className="laptops__title">{'ჩანაწერების სია'.toUpperCase()}</h1>
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
