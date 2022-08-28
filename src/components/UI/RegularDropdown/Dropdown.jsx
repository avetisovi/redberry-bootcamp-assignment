import React, { useState } from 'react';
import cl from './Dropdown.module.css';
import arrow from '../../../images/dropdown-arrow.svg';

const Dropdown = ({ placeholder, options }) => {
  const [currentChoice, setCurrentChoice] = useState(placeholder);
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const changeChoice = (e) => {
    setCurrentChoice(e.target.innerText);
    setMenuVisible(false);
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.current} onClick={toggleMenu}>
        <span>{currentChoice}</span>
        <img className={menuVisible ? `${cl.active}` : ''} src={arrow} alt="" />
      </div>
      {menuVisible && (
        <ul className={cl.options}>
          {options.map((opt) => (
            <li className={cl.option} onClick={changeChoice} key={opt.id}>
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
