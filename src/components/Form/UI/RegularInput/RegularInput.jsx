import React, { useState } from 'react';
import cl from './RegularInput.module.css';

const RegularInput = ({
  value,
  onChange: setValue,
  type = 'text',
  placeholder,
  img,
  validation,
  name,
  valueName,
  alert,
  setAlert
}) => {
  // set invalid to true if filled content does'nt match validation
  const checkForVaidity = (e) => {
    if (
      !e.target.validity.valid &&
      e.target !== document.activeElement &&
      e.target.value !== ''
    ) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem(valueName, e.target.value);
    checkForVaidity(e);
  };

  return (
    <div className={alert ? cl.wrapper + ' ' + cl.invalid : cl.wrapper}>
      <input
        className={cl.input}
        {...{ value, type, placeholder, name, onChange }}
        {...validation}
        id={name}
        onBlur={checkForVaidity}
        onFocus={() => setAlert(false)}
      />
      {img && <img className={cl.img} src={img} alt="" />}
    </div>
  );
};

export default RegularInput;
