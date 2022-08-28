import React from 'react';
import cl from './InputWithLabelAndHint.module.css';
import RegularInput from '../RegularInput/RegularInput';

const InputWithLabelAndHint = ({
  label,
  hint,
  onChange,
  value,
  type,
  name,
  placeholder
}) => {
  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {label}
      </label>
      <RegularInput {...{ onChange, value, type, placeholder }} />
      <p className={cl.hint}>{hint}</p>
    </div>
  );
};

export default InputWithLabelAndHint;
