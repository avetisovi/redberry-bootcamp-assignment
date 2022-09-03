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
  valueName
}) => {
  // if invalid is true change input styles
  const [invalid, setInvalid] = useState(false);

  // set invalid to true if filled content does'nt match validation
  const checkForVaidity = (e) => {
    if (
      !e.target.validity.valid &&
      e.target !== document.activeElement &&
      e.target.value !== ''
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem(valueName, e.target.value);
    checkForVaidity(e);
  };

  return (
    <div className={invalid ? `${cl.wrapper} invalid` : cl.wrapper}>
      <input
        required
        className={cl.input}
        {...{ value, type, placeholder, name, onChange }}
        {...validation}
        id={name}
        onBlur={checkForVaidity}
      />
      {img && <img className={cl.img} src={img} alt="" />}
    </div>
  );
};

export default RegularInput;
