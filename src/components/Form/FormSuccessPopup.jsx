import React from 'react';
import { Link } from 'react-router-dom';

import successIcon from '../../images/success.svg';

const FormSuccessPopup = () => {
  // disabling scroll when FormSuccessData is shown
  document.querySelector('body').style.overflow = 'hidden';
  document.querySelector('html').style.overflow = 'hidden';

  return (
    <div className="success__popup-wrapper">
      <div className="success__popup">
        <img src={successIcon} alt="" className="success__popup-img" />
        <h3 className="success__popup-title">ჩანაწერი დამატებულია!</h3>
        <Link className="success__popup-listLink" to="/laptops">
          სიაში გადაყვანა
        </Link>
        <Link className="success__popup-landingLink" to="/">
          მთავარი
        </Link>
      </div>
    </div>
  );
};

export default FormSuccessPopup;
