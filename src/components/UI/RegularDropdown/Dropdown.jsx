import React, { useState } from 'react';
import cl from './Dropdown.module.css';
import arrow from '../../../images/dropdown-arrow.svg';
import { triggerOnEnter } from '../../../utils';

const Dropdown = ({
  placeholder,
  options,
  setValue,
  value,
  disabled,
  alert,
  setAlert
}) => {
  const [currentChoiceName, setCurrentChoiceName] = useState(
    value?.name || placeholder
  );
  const [menuVisible, setMenuVisible] = useState(false);

  // change styling when disabled or invalid
  const classes = () => {
    let initialClass = cl.wrapper;
    if (disabled) {
      initialClass += ' ' + cl.disabled;
    }
    if (alert) {
      initialClass += ' ' + cl.alert;
    }

    return initialClass;
  };

  // toggle list of choices
  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setMenuVisible((prev) => !prev);
    }
  };

  const changeChoice = (opt) => {
    setCurrentChoiceName(opt.name);
    setValue(opt);
    setMenuVisible(false);
    setAlert(false);
  };

  // hide list of choices when clicking on random spot
  document.querySelector('body').addEventListener('click', (e) => {
    setMenuVisible(false);
  });

  return (
    <div className={classes()}>
      <div
        tabIndex="0"
        className={cl.current}
        onClick={toggleMenu}
        onKeyPress={triggerOnEnter}
      >
        <span>{currentChoiceName}</span>
        <img className={menuVisible ? `${cl.active}` : ''} src={arrow} alt="" />
      </div>
      {menuVisible && !disabled && (
        <ul className={cl.options}>
          {options.map((opt) => (
            <li
              tabIndex="0"
              className={cl.option}
              onClick={() => changeChoice(opt)}
              onKeyPress={triggerOnEnter}
              key={opt.id}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
