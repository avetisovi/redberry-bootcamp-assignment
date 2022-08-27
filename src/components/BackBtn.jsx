import React from 'react';
import { Link } from 'react-router-dom';
import arrowBack from '../images/arrow-back.svg';

const BackBtn = () => {
  return (
    <Link className="back-btn" to="/">
      <img src={arrowBack} alt="Back to landing page" />
    </Link>
  );
};

export default BackBtn;
