import React from 'react';
import { useNavigate } from 'react-router-dom';

import successIcon from '../../images/success.svg';

const FormSuccessPopup = ({ setVisible }) => {
  const navigate = useNavigate();
  const handleNavigation = (to) => {
    navigate(to);
    setVisible(false);
    document.querySelector('body').style.overflow = 'auto';
  };
  return (
    <div className="success__popup-wrapper">
      <div className="success__popup">
        <img src={successIcon} alt="" className="success__popup-img" />
        <h3 className="success__popup-title">ჩანაწერი დამატებულია!</h3>
        <button
          className="success__popup-listLink"
          onClick={() => {
            handleNavigation('/laptops');
          }}
        >
          სიაში გადაყვანა
        </button>
        <button
          className="success__popup-landingLink"
          onClick={() => handleNavigation('/')}
        >
          მთავარი
        </button>
      </div>
    </div>
  );
};

export default FormSuccessPopup;
