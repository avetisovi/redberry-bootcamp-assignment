import React from 'react';

import cl from './RegularRadioInput.module.css';
import alertImg from '../../../images/imgMissing.svg';

const RegularRadioInput = ({
  title,
  name,
  options,
  setValue,
  value,
  setAlert,
  alert,
  valueName
}) => {
  const handleChange = (e, opt) => {
    setValue(opt.id);
    localStorage.setItem(valueName, opt.id);
    setAlert(false);
  };

  return (
    <div className={alert ? `${cl.wrapper} ${cl.alert}` : cl.wrapper}>
      <p className={cl.title}>
        <span>{title}</span>
        {alert && <img src={alertImg} alt="fill this blank" />}
      </p>
      <ul className={cl.list}>
        {options.map((opt) => (
          <li className={cl.listItem} key={opt.id}>
            <input
              className={cl.input}
              type="radio"
              id={opt.id}
              name={name}
              onChange={(e) => handleChange(e, opt)}
              checked={value === opt.id}
              value={opt.id}
            />
            <label className={cl.label} htmlFor={opt.id}>
              {opt.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegularRadioInput;
