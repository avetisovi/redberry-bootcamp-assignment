import React from 'react';
import cl from './InputWithLabelAndHint.module.css';
import RegularInput from '../RegularInput/RegularInput';

const InputWithLabelAndHint = ({
  label,
  hint,
  type,
  name,
  placeholder,
  img,
  validation,
  value,
  onChange,
  valueName,
  alert,
  setAlert
}) => {
  return (
    <div className={alert ? cl.wrapper + ' ' + cl.invalid : cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {label}
      </label>
      <RegularInput
        {...{
          onChange,
          value,
          type,
          placeholder,
          img,
          validation,
          name,
          valueName,
          alert,
          setAlert
        }}
      />
      <p className={cl.hint}>{hint}</p>
    </div>
  );
};

export default InputWithLabelAndHint;
