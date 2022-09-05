import React, { useState, useEffect, useContext } from 'react';
import LaptopListItem from '../components/Laptop/LaptopListItem';
import BackBtn from '../components/UI/BackBtn/BackBtn';
import { ServerErrorContext } from '../context';
import { getData } from '../utils';

const LaptopsList = () => {
  const [laptops, setLaptops] = useState([]);
  const { setServerError, setErrorText } = useContext(ServerErrorContext);

  // fetching laptops list and then parsing it to laptops array
  useEffect(() => {
    getData(
      `https://pcfy.redberryinternship.ge/api/laptops?token=${process.env.REACT_APP_TOKEN}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => setLaptops(res.data));
      } else {
        setServerError(true);
        setErrorText(res.statusText);
      }
    });
  }, []);

  document.querySelector('body').style.overflow = 'auto';
  document.querySelector('html').style.overflow = 'auto';

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
