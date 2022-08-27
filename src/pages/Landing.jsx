import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/landing-logo.png';
import landingDesktop from '../images/landing-desktop.svg';
import landingMobile from '../images/landing-mobile.svg';

const Landing = () => {
  return (
    <div className="landing-page">
      <Link className="landing-logo" to="/">
        <img src={logo} alt="REDBERRY" />
      </Link>
      <picture>
        <source media="(max-width:810px)" srcset={landingMobile} />
        <img className="landing-img" src={landingDesktop} alt="" />
      </picture>
      <div className="landing-links">
        <Link to="/form" className="landing-link">
          ჩანაწერის დამატება
        </Link>
        <Link to="/" className="landing-link">
          ჩანაწერების სია
        </Link>
      </div>
    </div>
  );
};

export default Landing;
