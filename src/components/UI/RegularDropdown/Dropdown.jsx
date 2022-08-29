import React, { useState } from 'react';
import cl from './Dropdown.module.css';
import arrow from '../../../images/dropdown-arrow.svg';

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
  const [currentChoice, setCurrentChoice] = useState(value);
  const [menuVisible, setMenuVisible] = useState(false);

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

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setMenuVisible((prev) => !prev);
    }
  };

  const changeChoice = (opt) => {
    setCurrentChoice(opt);
    setCurrentChoiceName(opt.name);
    setValue(opt);
    setMenuVisible(false);
    setAlert(false);
  };

  const triggerOnEnter = (e) => {
    e.preventDefault();
    e.target.click();
  };

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
