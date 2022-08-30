import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../images/success.svg';

const FormSuccessPopup = () => {
  return (
    <div className="success__popup-wrapper">
      <div className="success__popup">
        <img src={successIcon} alt="" className="success__popup-img" />
        <h3 className="success__popup-title">ჩანაწერი დამატებულია!</h3>
        <Link className="success__popup-listLink" to="/">
          სიაში გადაყვანა
        </Link>
        <Link to="/" className="success__popup-landingLink">
          მთავარი
        </Link>
      </div>
    </div>
  );
};

export default FormSuccessPopup;
