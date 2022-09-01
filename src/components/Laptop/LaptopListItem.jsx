import React from 'react';
import { Link } from 'react-router-dom';

const LaptopListItem = ({ data }) => {
  return (
    <li className="laptops__item">
      <img
        className="laptops__item-img"
        src={`https://pcfy.redberryinternship.ge/${data.laptop.image}`}
        alt="laptop"
      />
      <div className="laptops__item-content">
        <h3 className="laptops__item-userName">
          {data.user.name} {data.user.surname}
        </h3>
        <p className="laptops__item-laptopName">{data.laptop.name}</p>
        <Link className="laptops__item-link" to={`/laptops/${data.laptop.id}`}>
          მეტის ნახვა
        </Link>
      </div>
    </li>
  );
};

export default LaptopListItem;
