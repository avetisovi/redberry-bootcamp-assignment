import React from 'react';
import cl from './DateInput.module.css';

const DateInput = ({ label, name, setValue, value, placeholder }) => {
  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {label}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        id={name}
        className={cl.input}
        onFocus={(e) => {
          e.target.type = 'date';
        }}
        {...{ value, placeholder }}
      />
    </div>
  );
};

export default DateInput;
