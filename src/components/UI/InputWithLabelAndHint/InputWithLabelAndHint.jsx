import React from 'react';
import cl from './InputWithLabelAndHint.module.css';
import RegularInput from '../RegularInput/RegularInput';

const InputWithLabelAndHint = ({
  label,
  hint,
  onChange,
  type,
  name,
  placeholder,
  img,
  validation,
  value
}) => {
  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {label}
      </label>
      <RegularInput
        {...{ onChange, value, type, placeholder, img, validation }}
      />
      <p className={cl.hint}>{hint}</p>
    </div>
  );
};

export default InputWithLabelAndHint;
