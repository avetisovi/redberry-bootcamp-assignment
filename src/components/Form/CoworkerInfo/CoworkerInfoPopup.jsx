import React from 'react';
import alertImg from '../../../images/imgMissing.svg';
import { Link } from 'react-router-dom';

const CoworkerInfoPopup = ({ setVisible }) => {
  return (
    <div
      className="coworker-info__popup-wrapper"
      onClick={() => setVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="coworker-info__popup"
      >
        <img src={alertImg} alt="" className="coworker-info__popup-img" />
        <h3 className="coworker-info__popup-title">
          თანამშრომელს უკვე აქვს ლეპტოპი
        </h3>
        <Link className="coworker-info__popup-listLink" to="/laptops">
          სიაში გადაყვანა
        </Link>
        <button
          className="coworker-info__popup-landingLink"
          onClick={() => setVisible(false)}
        >
          უკან დაბრუნება
        </button>
      </div>
    </div>
  );
};

export default CoworkerInfoPopup;
