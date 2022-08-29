import React, { useState } from 'react';
import cl from './RegularInput.module.css';
import tickIcon from '../../../images/tick.svg';

const RegularInput = ({
  value,
  onChange: setValue,
  type = 'text',
  placeholder,
  img,
  validation,
  name
}) => {
  const [invalid, setInvalid] = useState(false);

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
      {img ? (
        <img className={cl.img} src={img} alt="" />
      ) : (
        <img className={cl.tick} src={tickIcon} alt="valid" />
      )}
    </div>
  );
};

export default RegularInput;
