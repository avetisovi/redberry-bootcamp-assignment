import React from 'react';
import cl from './DateInput.module.css';

const DateInput = ({ label, name, onChange, value, placeholder }) => {
  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cl.input}
        onFocus={(e) => (e.target.type = 'date')}
        onBlur={(e) => {
          e.target.type = 'text';
          e.target.value = e.target.value.split('-').reverse().join('-');
        }}
        {...{ onChange, value, placeholder }}
      />
    </div>
  );
};

export default DateInput;
