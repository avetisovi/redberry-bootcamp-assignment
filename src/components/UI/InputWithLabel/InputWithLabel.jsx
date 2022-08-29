import React from 'react';
import cl from './InputWithLabel.module.css';
import RegularInput from '../RegularInput/RegularInput';

const InputWithLabel = ({
  label,
  value,
  onChange,
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
    </div>
  );
};

export default InputWithLabel;
