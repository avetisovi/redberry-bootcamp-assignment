import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrowBack from '../images/arrow-back.svg';

const BackBtn = ({ formStep, prevStep }) => {
  const navigate = useNavigate();

  const handleNavigtion = () => {
    // go to forms first step if user is on forms second step
    if (formStep === 2) {
      prevStep();
      return;
    }

    // go to previous page
    navigate(-1);
  };
  return (
    <button onClick={handleNavigtion} className="back-btn">
      <img src={arrowBack} alt="Back to landing page" />
    </button>
  );
};

export default BackBtn;
